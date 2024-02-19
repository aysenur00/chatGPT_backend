package com.yavasoglu.chatgptbackend.service;

import com.yavasoglu.chatgptbackend.entity.WeeklyContent;
import com.yavasoglu.chatgptbackend.repository.WeeklyContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeeklyContentService {

    WeeklyContentRepository weeklyContentRepository;

    public WeeklyContentService(WeeklyContentRepository weeklyContentRepository) {
        this.weeklyContentRepository = weeklyContentRepository;
    }

    public List<WeeklyContent> getAllWeeklyContent() {
        return weeklyContentRepository.findAll();
    }
}
