package com.yavasoglu.chatgptbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
@Table(name = "article")
public class Article {

    @Id
    private String id;
    private String title;
    private Date dateOfAdd;
    @Lob
    @Column(columnDefinition="TEXT")
    private String content;

}
