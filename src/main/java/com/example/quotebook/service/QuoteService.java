package com.example.quotebook.service;

import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.example.quotebook.handler.ResourceNotFoundException;
import com.example.quotebook.model.Quote;
import com.example.quotebook.repository.QuoteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QuoteService {
    private final QuoteRepository repository;

    private final Random random = new Random();

    public List<Quote> getAllQuotes() {
        return repository.findAll();
    }
    
    public Quote getById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quote not found with id: "+id));
    }

    public Quote getRandomQuote() {
        List<Quote> quotes = getAllQuotes();
        if (quotes.isEmpty()) {
            throw new RuntimeException("No quotes available");
        }
        return quotes.get(random.nextInt(quotes.size()));
    }

    public List<Quote> getByAuthor(String author) {
        List<Quote> quotes = repository.findByAuthor(author);
        if (quotes.isEmpty()) {
            throw new ResourceNotFoundException("No quotes found for author: " + author);
        }
        return quotes;
    }
    
    public Quote createQuote(Quote quote) {
        return repository.save(quote);
    }

    public Quote updateQuote(String id, Quote modifyQuote) {
        Quote quote = getById(id);
        quote.setText(modifyQuote.getText());
        quote.setAuthor(modifyQuote.getAuthor());
        quote.setLikes(0);
        return createQuote(quote);
    }

    public void deleteQuote(String id) {
        Quote quote = getById(id);
        repository.delete(quote);
    }

    public Quote likeQuote(String id, Boolean status) {
        Quote quote = getById(id);
        if (status) {
            quote.setLikes(quote.getLikes()+1);
        } else {
            quote.setLikes(quote.getLikes()-1);
        }
        return createQuote(quote);
    }
}
