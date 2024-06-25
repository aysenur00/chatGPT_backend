package com.yavasoglu.chatgptbackend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/train")
public class FileController {

    @Autowired
    RestTemplate template;

    @PostMapping("/upload-file")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        
        try {
            //save temp file
            // Create a temporary file with the original filename and correct extension
            Path tempFile = Files.createTempFile(file.getOriginalFilename().replaceFirst("[.][^.]+$", ""), 
                                                 file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")));
            Files.copy(file.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            builder.part("purpose", "assistants");
            builder.part("file", new FileSystemResource(tempFile.toFile()));

            // Convert the MultiValueMap<String, HttpEntity<?>> to MultiValueMap<String, Object>
            MultiValueMap<String, HttpEntity<?>> builtMap = builder.build();
            MultiValueMap<String, Object> convertedMap = new LinkedMultiValueMap<>();
            builtMap.forEach((key, value) -> convertedMap.add(key, value.get(0)));

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(convertedMap, headers);

            ResponseEntity<String> response = template.postForEntity("https://api.openai.com/v1/files", requestEntity, String.class);

            // Clean up temporary file
            Files.deleteIfExists(tempFile);
            
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());

        } catch (Exception e) {
             e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }

    }
    

    
}
