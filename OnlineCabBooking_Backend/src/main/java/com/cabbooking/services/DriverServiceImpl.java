package com.cabbooking.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cabbooking.dto.DriverAvailabilityDto;
import com.cabbooking.dto.DriverDto;
import com.cabbooking.dto.DriverLocationDto;
import com.cabbooking.entities.Driver;
import com.cabbooking.entities.DriverLocation;
import com.cabbooking.entities.User;
import com.cabbooking.enums.DriverStatus;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.DriverLocationRepository;
import com.cabbooking.repository.DriverRepository;
import com.cabbooking.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;
    private final DriverLocationRepository driverLocationRepository;
    private final UserRepository userRepository;

    @Override
    public DriverDto addDriver(DriverDto driverDto) {

        User user = userRepository.findById(driverDto.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Driver driver = new Driver();

        driver.setUser(user);
        driver.setLicenseNumber(driverDto.getLicenseNumber());

        if (driverDto.getStatus() != null) {
            driver.setStatus(DriverStatus.valueOf(driverDto.getStatus()));
        }

        Driver savedDriver = driverRepository.save(driver);

        return convertToDto(savedDriver);
    }

    @Override
    public DriverDto getDriverById(Long driverId) {

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Driver not found"));

        return convertToDto(driver);
    }

    @Override
    public List<DriverDto> getAllDrivers() {

        return driverRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public DriverDto updateDriver(Long driverId, DriverDto driverDto) {

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Driver not found"));

        driver.setLicenseNumber(driverDto.getLicenseNumber());

        if (driverDto.getStatus() != null) {
            driver.setStatus(DriverStatus.valueOf(driverDto.getStatus()));
        }

        Driver updatedDriver = driverRepository.save(driver);

        return convertToDto(updatedDriver);
    }

    @Override
    public DriverAvailabilityDto updateAvailability(Long driverId,
            DriverAvailabilityDto availabilityDto) {

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Driver not found"));

        driver.setStatus(availabilityDto.getStatus());

        driverRepository.save(driver);

        return availabilityDto;
    }

    @Override
    public DriverLocationDto updateLocation(Long driverId,
            DriverLocationDto locationDto) {

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Driver not found"));

        DriverLocation location = new DriverLocation();

        location.setDriver(driver);
        location.setLatitude(locationDto.getLatitude());
        location.setLongitude(locationDto.getLongitude());

        DriverLocation savedLocation =
                driverLocationRepository.save(location);

        DriverLocationDto dto = new DriverLocationDto();

        dto.setDriverId(driverId);
        dto.setLatitude(savedLocation.getLatitude());
        dto.setLongitude(savedLocation.getLongitude());

        return dto;
    }

    private DriverDto convertToDto(Driver driver) {

        DriverDto dto = new DriverDto();

        dto.setId(driver.getId());
        dto.setUserId(driver.getUser().getId());
        dto.setLicenseNumber(driver.getLicenseNumber());
        dto.setStatus(driver.getStatus().name());

        return dto;
    }
}