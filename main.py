from fastapi import FastAPI, File, UploadFile, Form
import pandas as pd
import io
from starlette.responses import FileResponse

app = FastAPI()

def convert_to_percentage(value, max_marks):
    if isinstance(value, str):  # Handle combined marks with % symbol
        value = value.replace('%', '').strip()
        try:
            value = float(value)
        except ValueError:
            return "Invalid"
    
    if value > 100:  # Marks case
        percentage = (value / max_marks) * 100
    elif value <= 10:  # CGPA case
        percentage = value * 10
    else:  # Already Percentage case
        percentage = value
    return f"{round(min(max(percentage, 1), 100), 2)}%"  # Ensure range 1 to 100 with % symbol

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), max_marks: int = Form(...)):
    contents = await file.read()
    df = pd.read_excel(io.BytesIO(contents))
    
    if "Marks" not in df.columns:
        return {"error": "Excel file must have a 'Marks' column"}
    df["Percentage"] = df["Marks"].apply(lambda x: convert_to_percentage(x, max_marks))
    output_file = "updated_marks.xlsx"
    df.to_excel(output_file, index=False)
    
    return FileResponse(output_file, filename=output_file)