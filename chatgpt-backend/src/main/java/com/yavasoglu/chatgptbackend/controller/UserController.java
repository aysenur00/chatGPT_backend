package com.yavasoglu.chatgptbackend.controller;

import com.yavasoglu.chatgptbackend.entity.MarkCompletedRequest;
import com.yavasoglu.chatgptbackend.entity.WeeklyContent;
import com.yavasoglu.chatgptbackend.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.yavasoglu.chatgptbackend.entity.User;

@RestController
@RequestMapping("/api")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/users")
    public void markWeekAsCompleted(@RequestBody User request) {
        userService.markWeekAsCompleted(request);
    }

    // user record progress put post
    // user mark completeda basacak
    // api request atılır put
    // userid, weekid, quizid
}
