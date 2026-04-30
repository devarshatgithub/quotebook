package com.example.quotebook.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.quotebook.model.Quote;

import java.util.List;

public interface QuoteRepository extends MongoRepository<Quote, String> {
    List<Quote> findByAuthor(String author);
}
