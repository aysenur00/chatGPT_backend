package com.yavasoglu.chatgptbackend.entity;

import jakarta.persistence.*;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Entity
@Data
@Table(name="weekly_content")
public class WeeklyContent {

    @Id
    private String id;
    private String title;
    private String week_number;
    private Date dateOfAdd;
    @Lob
    @Column(columnDefinition="TEXT")
    private String outcome;
    @Column(length = 2083)
    private String feedbackURL;
    @Column(length = 2083)
    private String slidesURL;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name= "fk_week_id")
    private List<Quiz> quizzes;
}
