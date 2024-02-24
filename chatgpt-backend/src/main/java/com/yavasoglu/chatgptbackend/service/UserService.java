package com.yavasoglu.chatgptbackend.service;

import com.yavasoglu.chatgptbackend.entity.MarkCompletedRequest;
import com.yavasoglu.chatgptbackend.entity.User;
import com.yavasoglu.chatgptbackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public void markWeekAsCompleted(User request) {
        userRepository.save(request);
    }
}
