package com.yavasoglu.chatgptbackend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yavasoglu.chatgptbackend.service.ChatService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("/api/train")
@RestController
public class ChatController {
    
    @Autowired
    private ChatService chatService;

    // @PostMapping("/message")
    // public ResponseEntity<String> getChatResponse(@RequestBody Map<String,String> request) {
    //     String prompt = request.get("prompt");
    //     String response = chatService.getChatResponse(prompt);
    //     return ResponseEntity.ok(response);
    // }
    
    @PostMapping("/create-thread")
    public String createThread() {
        return chatService.createThread();
    }

    @PostMapping("/send-message")
    public Map<String, Object> sendMessage(@RequestBody Map<String, String> request) {
        String threadId = request.get("threadId");
        String prompt = request.get("prompt");
        return chatService.sendMessage(threadId, prompt);
    }

    @PostMapping("/create-run")
    public Map<String, Object> createRun(@RequestBody Map<String, String> request) {
        String threadId = request.get("threadId");
        String assistantId = request.get("assistantId");
        return chatService.createRun(threadId, assistantId);
    }
    
    @GetMapping("/run-status/{threadId}/{runId}")
    public Map<String, Object> getRunStatus(@PathVariable String threadId, @PathVariable String runId) {
        return chatService.getRunStatus(threadId, runId);
    }

    @GetMapping("/messages/{threadId}")
    public Map<String, Object> getMessages(@PathVariable String threadId) {
        return chatService.getMessages(threadId);
    }

}
