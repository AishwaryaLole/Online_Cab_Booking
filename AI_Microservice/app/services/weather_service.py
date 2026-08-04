import requests
from app.config.settings import WEATHER_API_KEY

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_weather(city: str):

    params = {
        "q": city,
        "appid": WEATHER_API_KEY,
        "units": "metric"
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        return {"error": "Unable to fetch weather."}

    data = response.json()

    return {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "condition": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"]
    }