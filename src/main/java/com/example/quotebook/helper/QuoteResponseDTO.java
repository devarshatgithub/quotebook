package com.example.quotebook.helper;

import java.time.ZonedDateTime;

import org.springframework.hateoas.RepresentationModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class QuoteResponseDTO extends RepresentationModel<QuoteResponseDTO> {
    
    private String id;
    private String text;
    private String author;
    private Integer likes;

    private ZonedDateTime createdAt;
    private ZonedDateTime modifiedAt;

}
