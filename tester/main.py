from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import base64
import os
from datetime import datetime

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend origin
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure the folder exists
os.makedirs("snapshots", exist_ok=True)

@app.post("/submit")
async def receive_data(request: Request):
    data = await request.json()
    name = data.get("name")
    mobile = data.get("mobile")
    email = data.get("email")
    image_data = data.get("image")  # Base64 image string

    # Extract base64 content
    if "," in image_data:
        image_data = image_data.split(",")[1]

    # Save image to file
    filename = f"{name}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"
    image_path = os.path.join("snapshots", filename)
    with open(image_path, "wb") as f:
        f.write(base64.b64decode(image_data))

    print(f"Received from {name}: {mobile}, {email}")
    print(f"Image saved as: {image_path}")

    return {"status": "success", "message": "Data received and image saved."}
