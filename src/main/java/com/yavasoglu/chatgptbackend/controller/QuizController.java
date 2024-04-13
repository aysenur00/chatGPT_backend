package com.yavasoglu.chatgptbackend.controller;

import com.yavasoglu.chatgptbackend.entity.Quiz;
import com.yavasoglu.chatgptbackend.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuizController {
    QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/quizzes")
    public List<Quiz> getAllQuiz(){
        return quizService.GetAllQuiz();
    }
    @GetMapping("/quizzes/{id}")
    public Quiz getQuiz(@PathVariable Long id){
        return quizService.GetQuiz(id);
    }
    @PostMapping("/quizzes")
    public void addQuiz(@RequestBody Quiz quiz){
        quizService.addQuiz(quiz);
    }
    @PutMapping("/quizzes/{id}")
    public void updateQuiz(@RequestBody Quiz quiz, @PathVariable Long id){
        quizService.updateQuiz(quiz, id);
    }
    @DeleteMapping("/quizzes/{id}")
    public void deleteQuiz(@PathVariable Long id){
        quizService.deleteQuiz(id);
    }
}
