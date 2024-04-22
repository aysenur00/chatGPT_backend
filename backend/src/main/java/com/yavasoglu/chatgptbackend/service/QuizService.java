package com.yavasoglu.chatgptbackend.service;

import com.yavasoglu.chatgptbackend.entity.Quiz;
import com.yavasoglu.chatgptbackend.repository.QuizRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<Quiz> GetAllQuiz(){
        return quizRepository.findAll();

    }
    public Quiz GetQuiz(Long id){
        return quizRepository.findById(id).orElse(null);

    }

    public void addQuiz(Quiz quiz){
        quizRepository.save(quiz);
    }

    public void updateQuiz(Quiz updatedQuiz, Long id){
        quizRepository.findById(id).ifPresent(existingQuiz -> {
            existingQuiz.setTitle(updatedQuiz.getTitle());
            existingQuiz.setUrl(updatedQuiz.getUrl());
            existingQuiz.setLevel(updatedQuiz.getLevel());
            existingQuiz.setQuizId(updatedQuiz.getQuizId());
            quizRepository.save(existingQuiz);
        });

    }

    public void deleteQuiz(Long id){
        boolean exists = quizRepository.existsById(id);
        if(exists){
            quizRepository.deleteById(id);
        }else{
            throw new EntityNotFoundException("Quiz with id " + id + " does not exist.");
        }
    }
}

