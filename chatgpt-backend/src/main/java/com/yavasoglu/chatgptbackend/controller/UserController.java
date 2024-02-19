package com.yavasoglu.chatgptbackend.controller;

import com.yavasoglu.chatgptbackend.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@NoArgsConstructor
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/hello")
    private String getHello(){
        return "Hello";
    }
}
