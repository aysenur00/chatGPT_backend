package com.yavasoglu.chatgptbackend.controller;

import com.yavasoglu.chatgptbackend.entity.MarkCompletedRequest;
import com.yavasoglu.chatgptbackend.entity.WeeklyContent;
import com.yavasoglu.chatgptbackend.entity.response.CompletedResponse;
import com.yavasoglu.chatgptbackend.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.yavasoglu.chatgptbackend.entity.User;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // user record progress put post
    // user mark completeda basacak
    // api request atılır put
    // userid, weekid, quizid
    @PutMapping("/users")
    public void markWeekAsCompleted(@RequestBody User request) {
        userService.markWeekAsCompleted(request);
    }

    @GetMapping("/users/completed-status")
    public ResponseEntity<CompletedResponse> getCompletedResponse(@RequestParam String userId, @RequestParam String weekNo){
        boolean completedStatus = userService.getCompletedStatus(userId, weekNo);

        CompletedResponse response = new CompletedResponse(completedStatus);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/completed-weeks")
    public ResponseEntity<List<String>> getCompletedWeeks(@RequestParam String userId){
        List<String> completedWeeks = userService.getCompletedWeeks(userId);
        return ResponseEntity.ok(completedWeeks);
    }

}
