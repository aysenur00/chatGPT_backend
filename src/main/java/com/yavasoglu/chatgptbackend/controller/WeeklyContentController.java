package com.yavasoglu.chatgptbackend.controller;

import com.yavasoglu.chatgptbackend.entity.WeeklyContent;
import com.yavasoglu.chatgptbackend.service.WeeklyContentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WeeklyContentController {

    WeeklyContentService weeklyContentService;

    public WeeklyContentController(WeeklyContentService weeklyContentService) {
        this.weeklyContentService = weeklyContentService;
    }

    @GetMapping("/weekly-contents")
    public List<WeeklyContent> getAllWeeklyContent(){
        return weeklyContentService.getAllWeeklyContent();
    }

    @GetMapping("/weekly-contents/{id}")
    public WeeklyContent getWeeklyContent(@PathVariable String id){
        return weeklyContentService.getWeeklycontent(id);
    }

    @PostMapping("/weekly-contents")
    public void addWeeklyContent(@RequestBody WeeklyContent weeklyContent){
        weeklyContentService.addWeeklyContent(weeklyContent);
    }

    @PutMapping("/weekly-contents/{id}")
    public void updateWeeklyContent(@RequestBody WeeklyContent weeklyContent, @PathVariable String id){
        weeklyContentService.updateWeeklyContent(weeklyContent, id);
    }

    @DeleteMapping("/weekly-contents/{id}")
    public void deleteWeeklyContent(@PathVariable String id){
        weeklyContentService.deleteWeeklyContent(id);

    }

}
