package com.yavasoglu.chatgptbackend.repository;

import com.yavasoglu.chatgptbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String>{
    Optional<User> findByUserIdAndWeekNo(String userId, String weekNo);

    List<User> findByUserIdAndCompleted(String userId, boolean completed);
}
