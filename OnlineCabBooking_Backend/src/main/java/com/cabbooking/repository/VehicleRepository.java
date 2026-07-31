package com.cabbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.Vehicle;

import jakarta.transaction.Transactional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long>{
	@Modifying
    @Transactional
    void deleteByDriver_Id(Long driverId);

}
