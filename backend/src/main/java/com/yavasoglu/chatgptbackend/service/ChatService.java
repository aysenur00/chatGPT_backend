package com.yavasoglu.chatgptbackend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatService {

    @Autowired
    RestTemplate restTemplate;

    @Value("${openaiApiKey}")
    private String apiKey;

    private static final String THREAD_API_URL = "https://api.openai.com/v1/threads";
    private static final String MSG_API_URL = "https://api.openai.com/v1/threads/{threadId}/messages";
    private static final String RUN_API_URL = "https://api.openai.com/v1/threads/{threadId}/runs";
    private static final String RUN_STATUS_URL = "https://api.openai.com/v1/threads/{threadId}/runs/{runId}";


    public String createThread(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("OpenAI-Beta", "assistants=v2");

        // Create an empty request body
        String requestBody = "";

        // Create the HTTP entity with headers and body
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Make the request
        ResponseEntity<String> response = restTemplate.exchange(THREAD_API_URL, HttpMethod.POST, entity, String.class);
        
        return response.getBody();
    }

    public Map<String, Object> sendMessage(String threadId, String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("OpenAI-Beta", "assistants=v2");

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("role", "user");
        requestBody.put("content", prompt);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        String url = MSG_API_URL.replace("{threadId}", threadId);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        return response.getBody();
    }

    public Map<String, Object> createRun(String threadId, String assistantId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("OpenAI-Beta", "assistants=v2");

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("assistant_id", assistantId);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        String url = RUN_API_URL.replace("{threadId}", threadId);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        return response.getBody();
    }

    public Map<String, Object> getRunStatus(String threadId, String runId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("OpenAI-Beta", "assistants=v2");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String url = RUN_STATUS_URL.replace("{threadId}", threadId).replace("{runId}", runId);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

        return response.getBody();
    }
    
    public Map<String, Object> getMessages(String threadId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("OpenAI-Beta", "assistants=v2");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        String url = MSG_API_URL.replace("{threadId}", threadId);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);

        return response.getBody();
    }
}
