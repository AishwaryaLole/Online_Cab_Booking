import re

from app.services.weather_service import get_weather
from app.services.springboot_service import (
    get_ride_history,
    get_payment_history,
    get_my_vehicle,
    get_my_ratings,
    get_driver_stats,
    get_active_drivers,
    get_available_drivers,
    get_passenger_count,
    get_fare_info,
    estimate_fare,
    get_booking_info,
    get_profile,
    get_assigned_rides,
    get_driver_history,
    get_admin_dashboard,
    get_admin_users,
    get_admin_drivers,
    get_admin_bookings,
    get_revenue_report,
    get_passenger_report,
    get_driver_report,
    get_booking_report,
)

from groq import Groq
from app.config.settings import GROQ_API_KEY
from app.utils.prompt import SYSTEM_PROMPT

client = Groq(api_key=GROQ_API_KEY)


def format_weather_reply(weather):
    if "error" in weather:
        return {"reply": weather["error"]}

    return {
        "reply": (
            f"🌤️ Weather in {weather['city']}\n\n"
            f"Temperature: {weather['temperature']}°C\n"
            f"Condition: {weather['condition']}\n"
            f"Humidity: {weather['humidity']}%"
        )
    }


def extract_distance_km(message):
    """Pulls a number followed by 'km' out of the message, e.g. 'fare for 12 km'."""
    match = re.search(r"(\d+(\.\d+)?)\s*k?m", message)
    return float(match.group(1)) if match else None


def get_chatbot_response(request):

    message = request.message.lower()
    
    # -----------------------------
    # Profile
    # -----------------------------
    if any(word in message for word in [
    "profile",
    "my profile",
    "account",
    "my account",
    "details",
    "my details",
    "information"
]):
        return get_profile(request.userId, request.role, request.token)

    # -----------------------------
    # Driver Assigned Rides
    # -----------------------------
    if (
    "assigned ride" in message
    or "assigned rides" in message
    or "my assigned rides" in message
):
        if request.role.upper() != "DRIVER":
            return {"reply": "I cannot answer."}
        return get_assigned_rides(request.userId, request.token)

 

    # -----------------------------
    # Admin Dashboard
    # -----------------------------
    if "dashboard" in message:

      if request.role.upper() == "ADMIN":
        return get_admin_dashboard(request.token)

      return {"reply": "I cannot answer."}

    # -----------------------------
    # Admin Users
    # -----------------------------
    if "all users" in message:
        if request.role.upper() != "ADMIN":
            return {"reply": "I cannot answer."}
        return get_admin_users(request.token)

    # -----------------------------
    # Admin Drivers
    # -----------------------------
    if "all drivers" in message:
        if request.role.upper() != "ADMIN":
            return {"reply": "I cannot answer."}
        return get_admin_drivers(request.token)

    # -----------------------------
    # Admin Bookings
    # -----------------------------
    if "all bookings" in message or "bookings" in message:
        if request.role.upper() != "ADMIN":
            return {"reply": "I cannot answer."}
        return get_admin_bookings(request.token)

    # -----------------------------
    # Revenue Report
    # -----------------------------
    if "revenue report" in message:
        if request.role.upper() != "ADMIN":
            return {"reply": "I cannot answer."}
        return get_revenue_report(request.token)

    # -----------------------------
    # Passenger Report
    # -----------------------------
    if "passenger report" in message:
        if request.role.upper() != "ADMIN":
            return {"reply": "I cannot answer."}
        return get_passenger_report(request.token)

    # -----------------------------
    # Driver Report
    # -----------------------------
    if "driver report" in message:
        if request.role.upper() != "ADMIN":
            return {"reply": "I cannot answer."}
        return get_driver_report(request.token)

    # -----------------------------
    # Booking Report
    # -----------------------------
    if "booking report" in message:
        if request.role.upper() != "ADMIN":
            return {"reply": "I cannot answer."}
        return get_booking_report(request.token)

    # -----------------------------
    # Weather
    # -----------------------------
    if "weather" in message:
        city = message.replace("weather", "").replace("in", "").strip()
        if city == "":
            city = "Pune"

        weather = get_weather(city)
        return format_weather_reply(weather)

    # -----------------------------
    # Ride history
    # -----------------------------
    if "ride history" in message or "my rides" in message or "past rides" in message:

       if request.role.upper() == "DRIVER":
           return get_driver_history(request.userId, request.token)

       return get_ride_history(request.userId, request.token)

    # -----------------------------
    # Payments
    # -----------------------------
    if "payment" in message:

       if request.role.upper() == "PASSENGER":
          return get_payment_history(request.userId, request.token)

       return {"reply": "I cannot answer."}

    # -----------------------------
    # Driver's own vehicle
    # -----------------------------
    if "vehicle" in message or "my car" in message or "my cab" in message:
        if request.role.upper() != "DRIVER":
            return {"reply": "Vehicle details are available for drivers only."}
        return get_my_vehicle(request.userId, request.token)

    # -----------------------------
    # Ratings / reviews (personal)
    # -----------------------------
    if "rating" in message or "review" in message:
        return get_my_ratings(request.userId, request.role, request.token)

    # -----------------------------
    # Platform stats: driver counts
    # -----------------------------
    if "available driver" in message:
        return get_available_drivers(request.token)

    if "active driver" in message:
        return get_active_drivers(request.token)

    if "driver count" in message or "how many driver" in message or "total driver" in message or "number of driver" in message:
        return get_driver_stats(request.token)

    # -----------------------------
    # Platform stats: passenger count
    # -----------------------------
    if "passenger count" in message or "how many passenger" in message or "total passenger" in message or "number of passenger" in message:
        return get_passenger_count(request.token)

    # -----------------------------
    # Fare info / estimate
    # -----------------------------
    if "per km" in message or "per kilometer" in message or "per kilo meter" in message or "fare structure" in message:
        return get_fare_info()

    if "estimate" in message and "fare" in message:
        distance_km = extract_distance_km(message)
        if distance_km:
            return estimate_fare(distance_km)
        return get_fare_info()

    if "fare" in message or "price" in message:
        return get_fare_info()

    # -----------------------------
    # Book a ride
    # -----------------------------
    if "book" in message and "ride" in message:
        return get_booking_info()

    # -----------------------------
    # Fallback: general LLM response, grounded by the system prompt
    # -----------------------------
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": request.message},
        ],
    )

    return {"reply": response.choices[0].message.content}

    