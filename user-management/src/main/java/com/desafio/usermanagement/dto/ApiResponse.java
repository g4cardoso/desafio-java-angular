package com.desafio.usermanagement.dto;

public record ApiResponse<T>(String mensagem, T dados) {
}
