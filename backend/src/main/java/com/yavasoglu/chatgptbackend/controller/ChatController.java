package com.yavasoglu.chatgptbackend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yavasoglu.chatgptbackend.service.ChatService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("/api/train")
@RestController
public class ChatController {
    
    @Autowired
    private ChatService chatService;

    @PostMapping("/message")
    public ResponseEntity<String> getChatResponse(@RequestBody Map<String,String> request) {
        String prompt = request.get("prompt");
        String response = chatService.getChatResponse(prompt);
        return ResponseEntity.ok(response);
    }
    
}
