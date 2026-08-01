package com.cabbooking.services;

import com.cabbooking.dto.VehicleDto;

public interface VehicleService {
    VehicleDto addVehicle(VehicleDto vehicleDto);
    VehicleDto getVehicleByDriverId(Long driverId);
    VehicleDto updateVehicle(Long vehicleId, VehicleDto vehicleDto);
}