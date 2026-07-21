package com.cabbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>  {

	
}
