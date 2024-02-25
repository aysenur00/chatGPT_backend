package com.yavasoglu.chatgptbackend.entity.response;

import lombok.Data;

@Data
public class CompletedResponse {

    private boolean completed;

    public CompletedResponse(boolean completed) {
        this.completed = completed;
    }
}
