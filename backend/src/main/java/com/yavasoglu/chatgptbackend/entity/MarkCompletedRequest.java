package com.yavasoglu.chatgptbackend.entity;

import lombok.Data;

@Data
public class MarkCompletedRequest {
    private String userId;
    private boolean completed;
    private String weekNo;
}
