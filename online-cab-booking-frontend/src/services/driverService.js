import api from "../api/api";

export const getDriverByUserId = async (userId) => {
  try {
    const res = await api.get(`/drivers/user/${userId}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to load driver",
    };
  }
};

export const updateDriver = async (driverId, data) => {
  try {
    const res = await api.put(`/drivers/${driverId}`, data);
    return {
      success: true,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Update failed",
    };
  }
};

export const updateDriverStatus = async (driverId, status) => {
  try {
    const res = await api.put(`/drivers/${driverId}/availability`, {
      driverId,
      status,
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Status update failed",
    };
  }
};

export const updateDriverLocation = async (driverId, latitude, longitude) => {
  try {
    const res = await api.put(`/drivers/${driverId}/location`, {
      driverId,
      latitude,
      longitude,
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Location update failed",
    };
  }
};