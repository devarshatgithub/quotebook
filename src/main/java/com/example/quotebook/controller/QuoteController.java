package com.example.quotebook.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.quotebook.helper.QuoteMapper;
import com.example.quotebook.helper.QuoteRequestDTO;
import com.example.quotebook.helper.QuoteResponseDTO;
import com.example.quotebook.model.Quote;
import com.example.quotebook.service.QuoteService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    private final QuoteService service;

    @GetMapping
    public List<QuoteResponseDTO> getAll() {
        return service.getAllQuotes()
                .stream()
                .map(QuoteMapper::toDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public QuoteResponseDTO getById(@PathVariable("id") String id) {
        return QuoteMapper.toDTO(service.getById(id));
    }

    @GetMapping("/random")
    public QuoteResponseDTO random() {
        return QuoteMapper.toDTO(service.getRandomQuote());
    }

    @GetMapping("/authors")
    public List<String> getAuthor() {
        return service.getAuthors()
                .stream()
                .toList();
    }

    @GetMapping("/authors/{author}")
    public List<QuoteResponseDTO> byAuthor(@PathVariable("author") String author) {
        return service.getByAuthor(author)
                .stream()
                .map(QuoteMapper::toDTO)
                .toList();
    }

    @PostMapping
    public QuoteResponseDTO create(@Valid @RequestBody QuoteRequestDTO dto) {
        Quote quote = QuoteMapper.toEntity(dto);
        Quote saved = service.createQuote(quote);
        return QuoteMapper.toDTO(saved);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") String id) {
        service.deleteQuote(id);
    }

    @PutMapping("/{id}")
    public QuoteResponseDTO update(@PathVariable("id") String id, @Valid @RequestBody QuoteRequestDTO dto) {
        Quote quote = QuoteMapper.toEntity(dto);
        Quote updated = service.updateQuote(id, quote);
        return QuoteMapper.toDTO(updated);
    }

    @PostMapping("/{id}")
    public QuoteResponseDTO likeQuote(@PathVariable("id") String id, @RequestParam("liked") Boolean liked) {
        Quote quote = service.likeQuote(id, liked);
        return QuoteMapper.toDTO(quote);
    }
}
