package com.cabbooking.services;

import java.util.List;
import java.util.Map;

import com.cabbooking.dto.DriverReportDto;
import com.cabbooking.dto.DriverStatusUpdateRequest;
import com.cabbooking.dto.RevenueReportDto;
import com.cabbooking.dto.RideCancellationRequest;
import com.cabbooking.dto.UserUpdateRequest;
import com.cabbooking.entities.Driver;
import com.cabbooking.entities.Ride;
import com.cabbooking.entities.User;
import com.cabbooking.enums.DriverStatus;

public interface IAdminService {

    Driver approveDriver(Long driverId);

    Driver blockDriver(Long driverId);

    Driver updateDriverStatus(Long driverId, DriverStatusUpdateRequest request);

    List<User> getAllUsers();

    User getUserById(Long userId);

    User updateUser(Long userId, UserUpdateRequest request);

    void deleteUser(Long userId);

    Ride cancelRide(Long rideId, RideCancellationRequest request);

    Map<String, Object> getBookingReport();

    RevenueReportDto getRevenueReport();

    DriverReportDto getDriverReport();
    
    Map<String, Object> getDashboardStats();
    
    List<Driver> getAllDrivers();
}