package com.yavasoglu.chatgptbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int completionId;
    private String userId;
    private boolean completed;
    private String weekNo;

}
