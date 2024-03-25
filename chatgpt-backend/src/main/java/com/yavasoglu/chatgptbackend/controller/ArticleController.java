package com.yavasoglu.chatgptbackend.controller;

import com.yavasoglu.chatgptbackend.entity.Article;
import com.yavasoglu.chatgptbackend.service.ArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleController {

    ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/articles")
    public List<Article> getAllArticle(){
        return articleService.getAllArticle();
    }
    @GetMapping("/articles/{id}")
    public Article getArticle(@PathVariable String id){
        return articleService.getArticle(id);
    }
    @PostMapping("/articles")
    public void addArticle(@RequestBody Article article){
        articleService.addArticle(article);
    }
    @PutMapping("/articles/{id}")
    public void updateArticle(@RequestBody Article article, @PathVariable String id){
        articleService.updateArticle(article, id);
    }
    @DeleteMapping("/articles/{id}")
    public void deleteArticle(@PathVariable String id){
        articleService.deleteArticle(id);
    }
}
