package com.yavasoglu.chatgptbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name="quiz")
@Data
@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;
    private String title;
    private String level;
    private String url;

}
