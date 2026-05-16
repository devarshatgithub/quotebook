package com.example.quotebook;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.quotebook.model.Quote;
import com.example.quotebook.repository.QuoteRepository;

@Configuration
public class DatabaseLoader {
    
    @Bean
    CommandLineRunner loadData(QuoteRepository repository) {
        return args -> {

            if (repository.count() > 0) {
                return;
            }
            
            List<Quote> quotes = List.of(
                new Quote(null,
                    "Working with Spring Boot is like pair-programming with the Spring developers.",
                    "admin", null, null, 5),
			    new Quote(null,
                    "With Boot you deploy everywhere you can find a JVM basically.",
                    "admin", null, null, 8),
			    new Quote(null,
                    "Spring has come quite a ways in addressing developer enjoyment and ease of use since the last time I built an application using it.",
                    "admin", null, null, 6),
			    new Quote(null,
                    "Previous to Spring Boot, I remember XML hell, confusing set up, and many hours of frustration.",
                    "admin", null, null, 4),
			    new Quote(null,
                    "Spring Boot solves this problem. It gets rid of XML and wires up common components for me, so I don't have to spend hours scratching my head just to figure out how it's all pieced together.",
                    "admin", null, null, 7),
			    new Quote(null,
                    "It embraces convention over configuration, providing an experience on par with frameworks that excel at early stage development, such as Ruby on Rails.",
                    "admin", null, null, 3),
			    new Quote(null,
                    "The real benefit of Boot, however, is that it's just Spring. That means any direction the code takes, regardless of complexity, I know it's a safe bet.",
                    "admin", null, null, 6),
			    new Quote(null,
                    "I don't worry about my code scaling. Boot allows the developer to peel back the layers and customize when it's appropriate while keeping the conventions that just work.",
                    "admin", null, null, 5),
			    new Quote(null,
                    "So easy it is to switch container in #springboot.",
                    "admin", null, null, 7),
			    new Quote(null,
                    "Really loving Spring Boot, makes stand alone Spring apps easy.",
                    "admin", null, null, 9),
			    new Quote(null,
                    "I have two hours today to build an app from scratch. @springboot to the rescue!",
                    "admin", null, null, 4),
			    new Quote(null,
                    "@springboot with @springframework is pure productivity! Who said in #java one has to write double the code than in other langs?",
                    "admin", null, null, 7)
            );
            repository.saveAll(quotes);
            System.out.println("Sample quotes inserted into MongoDB");
        };
    }
}