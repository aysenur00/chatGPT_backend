package com.yavasoglu.chatgptbackend.config;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import jakarta.servlet.MultipartConfigElement;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRegistration;

public class MainWebAppInitializer implements WebApplicationInitializer{
    private static final String TMP_FOLDER = "/tmp"; 
    private static final int MAX_UPLOAD_SIZE = 5 * 1024 * 1024; 

    @Override
    public void onStartup(@SuppressWarnings("null") ServletContext sc) throws ServletException {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(OpenAiConfig.class);
        ctx.setServletContext(sc);

        ServletRegistration.Dynamic appServlet = sc.addServlet("dispatcher", new DispatcherServlet(ctx));
        appServlet.setLoadOnStartup(1);
        
        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(TMP_FOLDER, 
          MAX_UPLOAD_SIZE, MAX_UPLOAD_SIZE * 2L, MAX_UPLOAD_SIZE / 2);
        
        appServlet.setMultipartConfig(multipartConfigElement);
    }
}
