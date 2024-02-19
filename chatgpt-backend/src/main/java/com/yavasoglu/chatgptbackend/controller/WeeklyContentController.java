package com.yavasoglu.chatgptbackend.controller;

import com.yavasoglu.chatgptbackend.entity.WeeklyContent;
import com.yavasoglu.chatgptbackend.service.WeeklyContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WeeklyContentController {

    WeeklyContentService weeklyContentService;

    public WeeklyContentController(WeeklyContentService weeklyContentService) {
        this.weeklyContentService = weeklyContentService;
    }

    @GetMapping("/learn")
    public List<WeeklyContent> getAllWeeklyContent(){
        return weeklyContentService.getAllWeeklyContent();
    }
}
