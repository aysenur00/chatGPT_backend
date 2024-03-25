package com.yavasoglu.chatgptbackend.repository;

import com.yavasoglu.chatgptbackend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, String> {
}
