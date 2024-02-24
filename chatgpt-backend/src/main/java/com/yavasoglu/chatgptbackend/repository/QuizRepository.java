package com.yavasoglu.chatgptbackend.repository;

import com.yavasoglu.chatgptbackend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
