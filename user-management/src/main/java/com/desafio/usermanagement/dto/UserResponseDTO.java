package com.desafio.usermanagement.dto;

import com.desafio.usermanagement.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserResponseDTO(
        Long id,
        String nome,
        String email

){
    public UserResponseDTO(User user) {
        this(user.getId(), user.getNome(), user.getEmail());
    }
}
