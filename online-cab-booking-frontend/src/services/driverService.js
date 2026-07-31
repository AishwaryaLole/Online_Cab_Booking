import API from "../api/api";

// Helper to safely unwrap Spring Boot API response payloads
const extractData = (response) => response.data?.data ?? response.data;

/* ================================
   Driver Details
================================ */

export const getDriverById = async (driverId) => {
  try {
    const response = await API.get(`/drivers/${driverId}`);
    return extractData(response);
  } catch (error) {
    console.error("Get Driver Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to fetch driver details.",
      }
    );
  }
};

export const updateDriver = async (driverId, driverData) => {
  try {
    const response = await API.put(`/drivers/${driverId}`, driverData);
    return extractData(response);
  } catch (error) {
    console.error("Update Driver Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to update driver.",
      }
    );
  }
};

/* ================================
   Driver Availability
================================ */

export const getDriverAvailability = async (driverId) => {
  const driver = await getDriverById(driverId);
  return {
    online: driver?.status === "AVAILABLE",
  };
};

export const updateDriverAvailability = async (driverId, online) => {
  try {
    const response = await API.put(`/drivers/${driverId}/availability`, {
      status: online ? "AVAILABLE" : "OFFLINE",
    });
    return extractData(response);
  } catch (error) {
    console.error("Update Availability Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to update availability.",
      }
    );
  }
};

/* ================================
   Driver Location
================================ */

export const updateDriverLocation = async (driverId, latitude, longitude) => {
  try {
    const response = await API.put(`/drivers/${driverId}/location`, {
      latitude,
      longitude,
    });
    return extractData(response);
  } catch (error) {
    console.error("Update Location Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to update location.",
      }
    );
  }
};

/* ================================
   Ride Actions (Start / Complete)
================================ */

export const startRide = async (rideId) => {
  try {
    const response = await API.put(`/rides/start/${rideId}`);
    return extractData(response);
  } catch (error) {
    console.error("Start Ride Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to start ride.",
      }
    );
  }
};

export const completeRide = async (rideId) => {
  try {
    const response = await API.put(`/rides/complete/${rideId}`);
    return extractData(response);
  } catch (error) {
    console.error("Complete Ride Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to complete ride.",
      }
    );
  }
};

/* ================================
   Ride Requests (Pending / Accept / Reject)
================================ */

export const getRideRequests = async (driverId) => {
  try {
    const response = await API.get(`/rides/driver/${driverId}/pending`);
    return extractData(response);
  } catch (error) {
    console.error("Get Ride Requests Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to fetch ride requests.",
      }
    );
  }
};

export const acceptRideRequest = async (rideId) => {
  try {
    const response = await API.put(`/rides/${rideId}/accept`);
    return extractData(response);
  } catch (error) {
    console.error("Accept Ride Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to accept ride.",
      }
    );
  }
};

export const rejectRideRequest = async (rideId) => {
  try {
    const response = await API.put(`/rides/${rideId}/reject`);
    return extractData(response);
  } catch (error) {
    console.error("Reject Ride Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to reject ride.",
      }
    );
  }
};

/* ================================
   Earnings
================================ */

export const getDriverEarnings = async (driverId) => {
  try {
    const response = await API.get(`/drivers/${driverId}/earnings`);
    return extractData(response);
  } catch (error) {
    console.error("Get Driver Earnings Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to fetch earnings.",
      }
    );
  }
};

/* ================================
   Dashboard
================================ */

export const getDriverDashboard = async (driverId) => {
  const driver = await getDriverById(driverId);
  return {
    driver,
  };
};

/* ================================
   Vehicle
================================ */

export const getVehicleDetails = async (driverId) => {
  const driver = await getDriverById(driverId);
  return driver?.vehicle || null;
};

/* ================================
   Ride History
================================ */

export const getDriverRideHistory = async (driverId) => {
  try {
    const response = await API.get(`/rides/history/driver/${driverId}`);
    return extractData(response);
  } catch (error) {
    console.error("Get Ride History Error:", error);
    throw (
      error.response?.data || {
        message: "Unable to fetch ride history.",
      }
    );
  }
};