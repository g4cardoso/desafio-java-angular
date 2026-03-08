package com.desafio.usermanagement.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
public class ErrorResponse {

    private LocalDateTime timesTamp;
    private Integer status;
    private String message;
    private Map<String,String> errors;
}
