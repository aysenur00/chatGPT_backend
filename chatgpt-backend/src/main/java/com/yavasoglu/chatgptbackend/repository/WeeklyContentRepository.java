package com.yavasoglu.chatgptbackend.repository;

import com.yavasoglu.chatgptbackend.entity.WeeklyContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeeklyContentRepository extends JpaRepository<WeeklyContent, String> {
}
