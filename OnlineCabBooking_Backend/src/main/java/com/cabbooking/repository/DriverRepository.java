package com.cabbooking.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.Driver;
import com.cabbooking.enums.DriverStatus;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    

    List<Driver> findAllByStatus(DriverStatus status);

    default Driver saveDriver(Driver driver) {
        return save(driver);
    }
    
    @EntityGraph(attributePaths = {"user", "vehicles"})
    @Override
    List<Driver> findAll();
    
    @EntityGraph(attributePaths = {"user", "vehicles"})
    Optional<Driver> findById(Long id);
    
    Optional<Driver> findByUser_Id(Long userId);
    
}