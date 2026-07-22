package com.cabbooking.services;

import java.util.List;

import com.cabbooking.dto.DriverAvailabilityDto;
import com.cabbooking.dto.DriverDto;
import com.cabbooking.dto.DriverLocationDto;

public interface DriverService {

	// Get driver by id
    DriverDto getDriverById(Long driverId);

    // Get all drivers
    List<DriverDto> getAllDrivers();

    // Update driver details
    DriverDto updateDriver(Long driverId, DriverDto driverDto);

    // Update driver availability status
    DriverAvailabilityDto updateAvailability(Long driverId, DriverAvailabilityDto availabilityDto);

    // Update driver current location
    DriverLocationDto updateLocation(Long driverId, DriverLocationDto locationDto);

    DriverDto addDriver(DriverDto driverDto);
}
