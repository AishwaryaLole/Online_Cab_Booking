package com.cabbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.Driver;
import com.cabbooking.enums.DriverStatus;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    Optional<Driver> findByDriverId(Long driverId);

    List<Driver> findAllByStatus(DriverStatus status);

    Driver saveDriver(Driver driver);

}
