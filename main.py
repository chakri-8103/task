# from fastapi import FastAPI, File, UploadFile, Form
# import pandas as pd
# import io
# from starlette.responses import FileResponse

# app = FastAPI()

# def convert_to_percentage(value, max_marks):
#     if isinstance(value, str):  # Handle combined marks with % symbol
#         value = value.replace('%', '').strip()
#         try:
#             value = float(value)
#         except ValueError:
#             return "Invalid"
    
#     if value > 100:  # Marks case
#         percentage = (value / max_marks) * 100
#     elif value <= 10:  # CGPA case
#         percentage = value * 10
#     else:  # Already Percentage case
#         percentage = value
#     return f"{round(min(max(percentage, 1), 100), 2)}%"  # Ensure range 1 to 100 with % symbol

# @app.post("/upload/")
# async def upload_file(file: UploadFile = File(...), max_marks: int = Form(...)):
#     contents = await file.read()
#     df = pd.read_excel(io.BytesIO(contents))
    
#     if "Marks" not in df.columns:
#         return {"error": "Excel file must have a 'Marks' column"}
#     df["Percentage"] = df["Marks"].apply(lambda x: convert_to_percentage(x, max_marks))
#     output_file = "updated_marks.xlsx"
#     df.to_excel(output_file, index=False)
    
#     return FileResponse(output_file, filename=output_file)





# # from fastapi import FastAPI, HTTPException
# # from pydantic import BaseModel, EmailStr
# # import os

# # # FastAPI Setup
# # app = FastAPI()

# # # File to store emails
# # EMAIL_FILE = "emails.txt"

# # # Pydantic Model for Request
# # class EmailSchema(BaseModel):
# #     email: EmailStr  # Ensures valid email format

# # @app.post("/store-email/")
# # def store_email(email_data: EmailSchema):
# #     # Ensure the file exists
# #     if not os.path.exists(EMAIL_FILE):
# #         with open(EMAIL_FILE, "w") as f:
# #             pass  # Create an empty file if it doesn't exist

# #     # Read existing emails
# #     with open(EMAIL_FILE, "r") as f:
# #         emails = f.read().splitlines()

# #     # Check if email already exists
# #     if email_data.email in emails:
# #         raise HTTPException(status_code=400, detail="Email already exists")

# #     # Append the new email to the file
# #     with open(EMAIL_FILE, "a") as f:
# #         f.write(email_data.email + "\n")

# #     return {"message": "Email stored successfully", "email": email_data.email}




# import os
# import smtplib
# import tkinter as tk
# from email.message import EmailMessage

# # SMTP Email Configuration (Use Your Email)
# SMTP_SERVER = "smtp.gmail.com"  # For Gmail
# SMTP_PORT = 587
# SENDER_EMAIL = "janapaneedichakradhar678@gmail.com"
# SENDER_PASSWORD = "123456"  # Use App Password, NOT your real password

# # Function to read emails from file
# def get_emails():
#     if not os.path.exists("emails.txt"):
#         return []
#     with open("emails.txt", "r") as file:
#         return file.read().splitlines()

# # Function to send email notification
# def send_email_notification(email):
#     subject = "New Notification!"
#     body = f"Hello {email},\n\nYou have a new update!\n\nBest Regards,\nYour Team"

#     msg = EmailMessage()
#     msg.set_content(body)
#     msg["Subject"] = subject
#     msg["From"] = SENDER_EMAIL
#     msg["To"] = email

#     try:
#         server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
#         server.starttls()
#         server.login(SENDER_EMAIL, SENDER_PASSWORD)
#         server.send_message(msg)
#         server.quit()
#         print(f"Email sent to {email}")
#     except Exception as e:
#         print(f"Failed to send email: {e}")

# # Tkinter UI to select and send email
# def show_email_window():
#     emails = get_emails()

#     if not emails:
#         print("No emails found.")
#         return

#     def send_selected_email():
#         selected_email = email_var.get()
#         if selected_email:
#             send_email_notification(selected_email)

#     # Create Tkinter window
#     root = tk.Tk()
#     root.title("Send Email Notification")
#     root.geometry("300x200")

#     # Dropdown menu for selecting email
#     email_var = tk.StringVar(root)
#     email_var.set(emails[0])  # Default selection
#     dropdown = tk.OptionMenu(root, email_var, *emails)
#     dropdown.pack(pady=20)

#     # Send Email Button
#     send_btn = tk.Button(root, text="Send Email", command=send_selected_email)
#     send_btn.pack(pady=10)

#     root.mainloop()

# # Run Tkinter Window
# show_email_window()

