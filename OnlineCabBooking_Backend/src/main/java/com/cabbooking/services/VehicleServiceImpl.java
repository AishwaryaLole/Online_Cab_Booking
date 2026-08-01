package com.cabbooking.services;

import org.springframework.stereotype.Service;

import com.cabbooking.dto.VehicleDto;
import com.cabbooking.entities.Driver;
import com.cabbooking.entities.Vehicle;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.DriverRepository;
import com.cabbooking.repository.VehicleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;

    @Override
    public VehicleDto addVehicle(VehicleDto dto) {
        Driver driver = driverRepository.findById(dto.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));

        Vehicle vehicle = new Vehicle();
        vehicle.setDriver(driver);
        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setModel(dto.getModel());
        vehicle.setColor(dto.getColor());

        Vehicle saved = vehicleRepository.save(vehicle);
        return convertToDto(saved);
    }

    @Override
    public VehicleDto getVehicleByDriverId(Long driverId) {
        Vehicle vehicle = vehicleRepository.findByDriver_Id(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found for this driver"));
        return convertToDto(vehicle);
    }

    @Override
    public VehicleDto updateVehicle(Long vehicleId, VehicleDto dto) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setVehicleType(dto.getVehicleType());
        vehicle.setModel(dto.getModel());
        vehicle.setColor(dto.getColor());

        Vehicle updated = vehicleRepository.save(vehicle);
        return convertToDto(updated);
    }

    private VehicleDto convertToDto(Vehicle vehicle) {
        VehicleDto dto = new VehicleDto();
        dto.setId(vehicle.getId());
        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setVehicleType(vehicle.getVehicleType());
        dto.setModel(vehicle.getModel());
        dto.setColor(vehicle.getColor());
        dto.setDriverId(vehicle.getDriver().getId());
        return dto;
    }
}