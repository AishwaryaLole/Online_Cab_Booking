import requests
from app.config.settings import SPRING_BOOT_URL


def get_headers(token):
    return {
        "Authorization": token,
        "Content-Type": "application/json"
    }


def call_api(endpoint, token):
    """
    Calls the Spring Boot backend and unwraps the ApiResponse envelope.
    Every Spring Boot endpoint returns:
        { statusCode, success, message, data, timestamp }
    so we return body["data"] (the actual object/list), not the envelope.
    """
    try:
        url = f"{SPRING_BOOT_URL}{endpoint}"

        response = requests.get(
            url,
            headers=get_headers(token),
            timeout=10
        )

        if response.status_code == 200:
            body = response.json()
            if isinstance(body, dict) and "data" in body:
                return body["data"]
            return body

        return None

    except requests.exceptions.RequestException:
        return None


# -----------------------------
# Ride History (passenger)
# -----------------------------
def get_ride_history(user_id, token):

    rides = call_api(f"/api/rides/history/{user_id}", token)

    if rides is None:
        return {"reply": "Unable to fetch your ride history."}

    if len(rides) == 0:
        return {"reply": "You haven't booked any rides yet."}

    message = "🚕 Your Ride History\n\n"

    for i, ride in enumerate(rides, start=1):
        message += (
            f"{i}. Ride ID: {ride.get('id')}\n"
            f"Pickup: {ride.get('pickupLocation')}\n"
            f"Drop: {ride.get('dropLocation')}\n"
            f"Fare: ₹{ride.get('fare')}\n"
            f"Status: {ride.get('status')}\n\n"
        )

    message += f"Total Rides: {len(rides)}"
    return {"reply": message}


# -----------------------------
# Payment History (passenger)
# -----------------------------
def get_payment_history(user_id, token):

    payments = call_api(f"/api/payments/users/{user_id}", token)

    if payments is None:
        return {"reply": "Unable to fetch payment history."}

    if len(payments) == 0:
        return {"reply": "💳 No payment history found."}

    message = "💳 Payment History\n\n"

    for i, payment in enumerate(payments, start=1):
        message += (
            f"{i}. Payment ID: {payment.get('id')}\n"
            f"Amount: ₹{payment.get('amount')}\n"
            f"Status: {payment.get('paymentStatus')}\n"
            f"Ride ID: {payment.get('rideId')}\n\n"
        )

    message += f"Total Payments: {len(payments)}"
    return {"reply": message}


# -----------------------------
# Driver profile (by userId - used right after driver login)
# -----------------------------
def get_driver_by_user(user_id, token):
    return call_api(f"/api/drivers/user/{user_id}", token)


# -----------------------------
# Driver's own vehicle
# -----------------------------
def get_my_vehicle(user_id, token):

    driver = get_driver_by_user(user_id, token)

    if driver is None:
        return {"reply": "Unable to fetch your driver profile."}

    vehicle = driver.get("vehicle")

    if vehicle is None:
        return {"reply": "No vehicle is linked to your driver profile yet."}

    message = (
        "🚗 Your Vehicle\n\n"
        f"Number: {vehicle.get('vehicleNumber')}\n"
        f"Type: {vehicle.get('vehicleType')}\n"
        f"Model: {vehicle.get('model')}\n"
        f"Color: {vehicle.get('color')}"
    )
    return {"reply": message}


# -----------------------------
# Ratings received (driver) / given (passenger)
# -----------------------------
def get_my_ratings(user_id, role, token):

    if role.upper() == "DRIVER":
        driver = get_driver_by_user(user_id, token)
        if driver is None:
            return {"reply": "Unable to fetch your driver profile."}
        ratings = call_api(f"/api/ratings/drivers/{driver.get('id')}", token)
        empty_message = "You haven't received any ratings yet."
    else:
        ratings = call_api(f"/api/ratings/passengers/{user_id}", token)
        empty_message = "You haven't given any ratings yet."

    if ratings is None:
        return {"reply": "Unable to fetch ratings right now."}

    if len(ratings) == 0:
        return {"reply": empty_message}

    total = sum(r.get("rating", 0) for r in ratings)
    average = round(total / len(ratings), 1)

    message = "⭐ Your Ratings\n\n"
    for i, r in enumerate(ratings, start=1):
        message += f"{i}. Ride ID: {r.get('rideId')} - {r.get('rating')}/5\n"
        if r.get("comments"):
            message += f"   \"{r.get('comments')}\"\n"

    message += f"\nAverage Rating: {average}/5 ({len(ratings)} ratings)"
    return {"reply": message}


# -----------------------------
# Platform-wide driver stats (counts by real status/availability)
# -----------------------------
def get_driver_stats(token):

    drivers = call_api("/api/admins/drivers", token)

    if drivers is None:
        return {"reply": "Unable to fetch driver stats right now."}

    total = len(drivers)
    # A driver is "active" once approved by admin.
    active = [d for d in drivers if d.get("status") == "APPROVED"]
    # A driver is "available" when approved AND currently online (toggled on).
    available = [d for d in active if d.get("availability") is True]
    pending = [d for d in drivers if d.get("status") == "PENDING"]
    blocked = [d for d in drivers if d.get("status") == "BLOCKED"]

    message = (
        "🚦 Driver Stats\n\n"
        f"Total Drivers: {total}\n"
        f"Active (approved): {len(active)}\n"
        f"Available right now: {len(available)}\n"
        f"Pending approval: {len(pending)}\n"
        f"Blocked: {len(blocked)}"
    )
    return {"reply": message}


def get_active_drivers(token):
    drivers = call_api("/api/admins/drivers", token)
    if drivers is None:
        return {"reply": "Unable to fetch active drivers right now."}

    active = [d for d in drivers if d.get("status") == "APPROVED"]
    if len(active) == 0:
        return {"reply": "There are no active drivers right now."}

    message = f"🟢 Active Drivers ({len(active)})\n\n"
    for i, d in enumerate(active[:10], start=1):
        message += f"{i}. {d.get('name')} - {d.get('vehicleType') or 'Vehicle N/A'}\n"
    if len(active) > 10:
        message += f"\n...and {len(active) - 10} more."
    return {"reply": message}


def get_available_drivers(token):
    drivers = call_api("/api/admins/drivers", token)
    if drivers is None:
        return {"reply": "Unable to fetch available drivers right now."}

    available = [
        d for d in drivers
        if d.get("status") == "APPROVED" and d.get("availability") is True
    ]
    if len(available) == 0:
        return {"reply": "No drivers are available right now."}

    message = f"🟢 Available Drivers ({len(available)})\n\n"
    for i, d in enumerate(available[:10], start=1):
        message += f"{i}. {d.get('name')} - {d.get('vehicleType') or 'Vehicle N/A'}\n"
    if len(available) > 10:
        message += f"\n...and {len(available) - 10} more."
    return {"reply": message}


# -----------------------------
# Platform-wide passenger count
# -----------------------------
def get_passenger_count(token):

    users = call_api("/api/admins/users", token)

    if users is None:
        return {"reply": "Unable to fetch passenger stats right now."}

    passengers = [u for u in users if u.get("role") == "PASSENGER"]

    return {"reply": f"👥 Total Passengers: {len(passengers)}"}


# -----------------------------
# Fare info - kept in sync with RideServiceImpl.java's authoritative
# BASE_FARE / RATE_PER_KM constants (the values actually charged).
# -----------------------------
BASE_FARE = 12.0
RATE_PER_KM = 14.0


def get_fare_info():
    message = (
        "💰 Fare Structure\n\n"
        f"Base Fare: ₹{BASE_FARE:.0f}\n"
        f"Per KM Rate: ₹{RATE_PER_KM:.0f}/km\n\n"
        "Formula: Fare = Base Fare + (Distance in KM × Rate per KM)\n\n"
        "Example: A 10 km ride ≈ "
        f"₹{BASE_FARE:.0f} + (10 × ₹{RATE_PER_KM:.0f}) = ₹{BASE_FARE + 10 * RATE_PER_KM:.0f}"
    )
    return {"reply": message}


def estimate_fare(distance_km):
    fare = BASE_FARE + (distance_km * RATE_PER_KM)
    return {
        "reply": (
            f"📍 Estimated fare for {distance_km:.1f} km: ₹{fare:.0f}\n"
            f"(Base ₹{BASE_FARE:.0f} + {distance_km:.1f} km × ₹{RATE_PER_KM:.0f}/km)"
        )
    }


# -----------------------------
# Booking guidance
# -----------------------------
def get_booking_info():
    message = (
        "🚕 To book a ride:\n\n"
        "1. Go to 'Book Ride' from your dashboard\n"
        "2. Enter your pickup and drop locations\n"
        "3. Review the estimated fare\n"
        "4. Choose Cash, UPI, or Card and confirm\n\n"
        "Cash rides get a driver assigned immediately. UPI/Card rides "
        "wait for payment confirmation first."
    )
    return {"reply": message}

# =====================================================
# PROFILE
# =====================================================
def get_profile(user_id, role, token):

    role = role.upper()

    # Passenger/Admin
    if role != "DRIVER":
        profile = call_api(f"/api/admins/users/{user_id}", token)

        if profile is None:
            return {"reply": "Unable to fetch your profile."}

        message = (
            "👤 My Profile\n\n"
            f"Name: {profile.get('name')}\n"
            f"Email: {profile.get('email')}\n"
            f"Phone: {profile.get('phone')}\n"
            f"Role: {profile.get('role')}"
        )

        return {"reply": message}

    # ---------------- Driver ----------------

    driver = call_api(f"/api/drivers/user/{user_id}", token)

    if driver is None:
        return {"reply": "Unable to fetch your profile."}

    user = driver.get("user", {})
    vehicle = driver.get("vehicle", {})

    message = (
        "👤 Driver Profile\n\n"
        f"License: {driver.get('licenseNumber')}\n"
        f"Status: {driver.get('status')}\n"
        
    )

    return {"reply": message}

   


# =====================================================
# DRIVER ASSIGNED RIDES
# =====================================================
def get_assigned_rides(user_id, token):

    driver = get_driver_by_user(user_id, token)

    if driver is None:
        return {"reply": "Unable to fetch driver profile."}

    rides = call_api(
        f"/api/rides/driver/{driver.get('id')}/assigned",
        token
    )

    if rides is None:
        return {"reply": "Unable to fetch assigned rides."}

    if len(rides) == 0:
        return {"reply": "No assigned rides found."}

    message = "🚕 Assigned Rides\n\n"

    for i, ride in enumerate(rides, start=1):
        message += (
            f"{i}. Ride ID: {ride.get('id')}\n"
            f"Pickup: {ride.get('pickupLocation')}\n"
            f"Drop: {ride.get('dropLocation')}\n"
            f"Status: {ride.get('status')}\n\n"
        )

    return {"reply": message}


# =====================================================
# DRIVER RIDE HISTORY
# =====================================================
def get_driver_history(user_id, token):

    driver = get_driver_by_user(user_id, token)

    if driver is None:
        return {"reply": "Unable to fetch driver profile."}

    rides = call_api(
        f"/api/rides/driver/{driver.get('id')}/history",
        token
    )

    if rides is None:
        return {"reply": "Unable to fetch ride history."}

    if len(rides) == 0:
        return {"reply": "No rides found."}

    message = "🚖 Driver Ride History\n\n"

    for i, ride in enumerate(rides, start=1):
        message += (
            f"{i}. Ride ID: {ride.get('id')}\n"
            f"Pickup: {ride.get('pickupLocation')}\n"
            f"Drop: {ride.get('dropLocation')}\n"
            f"Fare: ₹{ride.get('fare')}\n"
            f"Status: {ride.get('status')}\n\n"
        )

    message += f"Total Rides: {len(rides)}"

    return {"reply": message}


# =====================================================
# ADMIN DASHBOARD
# =====================================================
def get_admin_dashboard(token):

    dashboard = call_api("/api/admins/dashboard", token)

    if dashboard is None:
        return {"reply": "Unable to fetch dashboard."}

    message = (
        "📊 Dashboard\n\n"
        f"Total Users: {dashboard.get('totalUsers')}\n"
        f"Total Drivers: {dashboard.get('totalDrivers')}\n"
        f"Total Bookings: {dashboard.get('totalBookings')}\n"
        f"Total Revenue: ₹{dashboard.get('totalRevenue')}"
    )

    return {"reply": message}


# =====================================================
# ADMIN USERS
# =====================================================
def get_admin_users(token):

    users = call_api("/api/admins/users", token)

    if users is None:
        return {"reply": "Unable to fetch users."}

    message = f"👥 Total Users: {len(users)}\n\n"

    for user in users[:10]:
        message += (
            f"{user.get('name')} ({user.get('role')})\n"
        )

    return {"reply": message}


# =====================================================
# ADMIN DRIVERS
# =====================================================
def get_admin_drivers(token):

    drivers = call_api("/api/admins/drivers", token)

    if drivers is None:
        return {"reply": "Unable to fetch drivers."}

    message = f"🚗 Total Drivers: {len(drivers)}\n\n"

    for driver in drivers[:10]:
        message += (
            f"{driver.get('name')} - {driver.get('status')}\n"
        )

    return {"reply": message}


# =====================================================
# ADMIN BOOKINGS
# =====================================================
def get_admin_bookings(token):

    bookings = call_api("/api/admins/bookings", token)

    if bookings is None:
        return {"reply": "Unable to fetch bookings."}

    return {
        "reply": f"📑 Total Bookings: {len(bookings)}"
    }


# =====================================================
# REVENUE REPORT
# =====================================================
def get_revenue_report(token):

    report = call_api("/api/admins/reports/revenue", token)

    if report is None:
        return {"reply": "Unable to fetch revenue report."}
    
    summary = report.get("summary", {})
    message = (
        "💰 Revenue Report\n\n"
        f"Total Revenue: ₹{summary.get('totalRevenue')}\n"
    )

    return {"reply": message}


# =====================================================
# PASSENGER REPORT
# =====================================================
def get_passenger_report(token):

    report = call_api("/api/admins/reports/passengers", token)

    if report is None:
        return {"reply": "Unable to fetch passenger report."}
    summary = report.get("summary", {})
    message = (
        "👥 Passenger Report\n\n"
        f"Total Passengers: {summary.get('totalPassengers')}\n"
        f"Active Passengers: {summary.get('activePassengers')}"
    )

    return {"reply": message}

# =====================================================
# DRIVER REPORT
# =====================================================
def get_driver_report(token):

    report = call_api("/api/admins/reports/drivers", token)

    if report is None:
        return {"reply": "Unable to fetch driver report."}
    summary = report.get("summary", {})
    message = (
        "🚖 Driver Report\n\n"
        f"Total Drivers: {summary.get('totalDrivers')}\n"
        f"Pending Drivers: {summary.get('pendingDrivers')}\n"
        f"Approved Drivers: {summary.get('approvedDrivers')}"
    )

    return {"reply": message}


# =====================================================
# BOOKING REPORT
# =====================================================
def get_booking_report(token):

    report = call_api("/api/admins/reports/bookings", token)

    if report is None:
        return {"reply": "Unable to fetch booking report."}
    summary = report.get("summary", {})
    message = (
        "📑 Booking Report\n\n"
        f"Total Bookings: {summary.get('totalBookings')}\n"
        f"Completed: {summary.get('completed')}\n"
        f"Pending: {summary.get('pending')}\n"
        f"Cancelled: {summary.get('cancelled')}"
    )

    return {"reply": message}