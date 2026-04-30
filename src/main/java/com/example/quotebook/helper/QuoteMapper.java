package com.example.quotebook.helper;

import java.time.ZoneId;

import com.example.quotebook.controller.QuoteController;
import com.example.quotebook.model.Quote;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

public class QuoteMapper {
    
    private static final ZoneId IST = ZoneId.of("Asia/Kolkata");
    
    public static Quote toEntity(QuoteRequestDTO dto) {
        Quote quote = new Quote();
        quote.setText(dto.getText());
        quote.setAuthor(dto.getAuthor());
        return quote;
    }
    
    public static QuoteResponseDTO toDTO(Quote quote) {
        if (quote == null) {
            return null;
        }
        return new QuoteResponseDTO(
                    quote.getId(),
                    quote.getText(),
                    quote.getAuthor(),
                    quote.getLikes(),
                    quote.getCreatedAt().atZone(IST),
                    quote.getModifiedAt().atZone(IST)
                ).add(linkTo(methodOn(QuoteController.class).getById(quote.getId())).withSelfRel());
    }
}
