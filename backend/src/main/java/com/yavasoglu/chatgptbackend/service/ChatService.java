package com.yavasoglu.chatgptbackend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatService {

    @Autowired
    RestTemplate restTemplate;

    @Value("${openaiApiKey}")
    private String apiKey;

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    public String getChatResponse(String prompt){
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(Map.of("role", "user", "content", prompt)));
        requestBody.put("max_tokens", 150);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.postForObject(API_URL, requestBody, Map.class);
            
            if (response != null && response.containsKey("choices")) {
                Object choices = response.get("choices");
                if (choices instanceof List) {
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> choicesList = (List<Map<String, Object>>) choices;
                    if (!choicesList.isEmpty()) {
                        Map<String, Object> choice = choicesList.get(0);
                        if (choice.containsKey("message")) {
                            Map<String, Object> message = (Map<String, Object>) choice.get("message");
                            if (message.containsKey("content")) {
                                return (String) message.get("content");
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "An error occurred: " + e.getMessage();
        }
        return "No response";
    }
}
