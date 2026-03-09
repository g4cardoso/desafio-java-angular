package com.desafio.usermanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
        @NotBlank(message = "o nome e obrigatorio")
        @Size(min = 3, max = 50, message = "o nomee deve ter entre 3 e 50 caracteres")
        String nome,
        @NotBlank(message = "o email e obrigatorio")
        @Email(message = "O e-mail deve ser valido")
        String email,
        @NotBlank(message = "a senha e obrigatoria")
        @Size(min = 3, max = 50, message = "o senha deve ter entre 3 e 50 caracteres")
        String senha,
        @NotBlank(message = "a confirmacaoSenha e obrigatoria")
        @Size(min = 3, max = 50, message = "o confirmacaoSenha deve ter entre 3 e 50 caracteres")
        String confirmacaoSenha) {
}
