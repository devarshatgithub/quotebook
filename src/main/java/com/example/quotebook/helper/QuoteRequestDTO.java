package com.example.quotebook.helper;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QuoteRequestDTO {

    @NotBlank(message = "Quote text is required")
    @Size(max = 500, message = "Quote must be at most 500 characters")
    private String text;

    @NotBlank(message = "Author is required")
    private String author;
}