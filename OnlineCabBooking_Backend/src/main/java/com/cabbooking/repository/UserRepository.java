package com.cabbooking.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

import com.cabbooking.entities.User;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {
	
	
	 Optional<User> findByEmail(String email);

	  Optional<User> findByPhone(String phone);

    default Optional<User> findByUserId(Long id) {
        return findById(id);
    }

    default List<User> findAllUsers() {
        return findAll();
    }

    default User saveUser(User user) {
        return save(user);
    }

    default void deleteUser(Long id) {
        deleteById(id);
    }
}

