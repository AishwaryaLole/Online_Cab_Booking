package com.cabbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(Long id);

    List<User> findAllUsers();

    default User saveUser(User user) {
        return save(user);
    }

    default void deleteUser(Long id) {
        deleteById(id);
    }
}