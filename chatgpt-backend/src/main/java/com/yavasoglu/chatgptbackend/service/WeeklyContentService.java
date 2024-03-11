package com.yavasoglu.chatgptbackend.service;

import com.yavasoglu.chatgptbackend.entity.WeeklyContent;
import com.yavasoglu.chatgptbackend.repository.WeeklyContentRepository;
import jakarta.persistence.EntityNotFoundException;
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

    public WeeklyContent getWeeklycontent(String id) {
        return weeklyContentRepository.findById(id).orElse(null);
    }

    public void addWeeklyContent(WeeklyContent weeklyContent) {
        weeklyContentRepository.save(weeklyContent);
    }

    public void updateWeeklyContent(WeeklyContent updatedWeeklyContent, String id) {
        weeklyContentRepository.findById(id).ifPresent(existingWeeklyContent -> {
            existingWeeklyContent.setId(updatedWeeklyContent.getId());
            existingWeeklyContent.setTitle(updatedWeeklyContent.getTitle());
            existingWeeklyContent.setWeek_number(updatedWeeklyContent.getWeek_number());
            existingWeeklyContent.setDateOfAdd(updatedWeeklyContent.getDateOfAdd());
            existingWeeklyContent.setOutcome(updatedWeeklyContent.getOutcome());
            existingWeeklyContent.setFeedbackURL(updatedWeeklyContent.getFeedbackURL());
            existingWeeklyContent.setSlidesURL(updatedWeeklyContent.getSlidesURL());
            existingWeeklyContent.setQuizzes(updatedWeeklyContent.getQuizzes());
            weeklyContentRepository.save(existingWeeklyContent);
        });

    }
    public void deleteWeeklyContent(String id) {
        boolean exists = weeklyContentRepository.existsById(id);
        if(exists){
            weeklyContentRepository.deleteById(id);
        }else{
            throw new EntityNotFoundException("WeeklyContent with id " + id + " does not exist.");
        }

    }
}
