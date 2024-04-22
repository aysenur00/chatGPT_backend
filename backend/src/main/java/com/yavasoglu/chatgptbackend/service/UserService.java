package com.yavasoglu.chatgptbackend.service;

import com.yavasoglu.chatgptbackend.entity.User;
import com.yavasoglu.chatgptbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void markWeekAsCompleted(User request) {
        userRepository.save(request);
    }

    public boolean getCompletedStatus(String userId, String weekNo) {
        Optional<User> user = userRepository.findByUserIdAndWeekNo(userId, weekNo);
        return user.map(User::isCompleted).orElse(false);
    }

    public List<String> getCompletedWeeks(String userId) {
        List<User> completedUserIds = userRepository.findByUserIdAndCompleted(userId, true);
        return completedUserIds.stream().map(User::getWeekNo).collect(Collectors.toList());
    }
}
