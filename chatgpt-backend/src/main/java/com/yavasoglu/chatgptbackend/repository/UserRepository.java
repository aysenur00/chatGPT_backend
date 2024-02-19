package com.yavasoglu.chatgptbackend.repository;

import com.yavasoglu.chatgptbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
}
