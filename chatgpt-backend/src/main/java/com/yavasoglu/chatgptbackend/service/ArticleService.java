package com.yavasoglu.chatgptbackend.service;

import com.yavasoglu.chatgptbackend.entity.Article;
import com.yavasoglu.chatgptbackend.repository.ArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
    }
    public List<Article> getAllArticle(){
        return articleRepository.findAll();
    }
    public Article getArticle(String id){
        return articleRepository.findById(id).orElse(null);
    }
    public void addArticle(Article article){
        articleRepository.save(article);

    }
    public void updateArticle(Article updatedArticle, String id){
        articleRepository.findById(id).ifPresent(existingArticle ->
                {
                    existingArticle.setTitle(updatedArticle.getTitle());
                    existingArticle.setDateOfAdd(updatedArticle.getDateOfAdd());
                    existingArticle.setContent(updatedArticle.getContent());
                }
                );
    }
    public void deleteArticle(String id){
        boolean exists = articleRepository.existsById(id);
        if(exists){
            articleRepository.deleteById(id);
        }else{
            throw new EntityNotFoundException(("Article with id" + id + "does not exist."));
        }
    }

}
