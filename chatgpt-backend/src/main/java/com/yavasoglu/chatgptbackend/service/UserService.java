package com.yavasoglu.chatgptbackend.service;

import com.yavasoglu.chatgptbackend.repository.UserRepository;

public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
