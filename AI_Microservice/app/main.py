from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.chat import router as chat_router
from app.routers.weather import router as weather_router

app = FastAPI(
    title="Online Cab Booking AI Microservice",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(weather_router)

@app.get("/")
def home():
    return {
        "message": "AI Microservice is Running Successfully"
    }