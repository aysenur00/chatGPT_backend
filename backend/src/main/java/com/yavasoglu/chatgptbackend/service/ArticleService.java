package com.yavasoglu.chatgptbackend.service;

import com.yavasoglu.chatgptbackend.entity.Article;
import com.yavasoglu.chatgptbackend.repository.ArticleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Base64;
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
        // Decode Base64 encoded html before saving
        String decoded = decodeBase64(article.getContent());
        article.setContent(decoded);
        articleRepository.save(article);

    }
    public void updateArticle(Article updatedArticle, String id){
        articleRepository.findById(id).ifPresent(existingArticle ->
                {
                    existingArticle.setTitle(updatedArticle.getTitle());
                    existingArticle.setDateOfAdd(updatedArticle.getDateOfAdd());
                    // Decode the Base64-encoded HTML content before updating
                    String decodedContent = decodeBase64(updatedArticle.getContent());
                    existingArticle.setContent(decodedContent);
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
    private String decodeBase64(String encodedString){
        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        return new String(decodedBytes);
    }

}
