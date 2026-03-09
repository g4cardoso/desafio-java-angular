package com.desafio.usermanagement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    //adicionado para nao precisar realizar login pelo front
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desabilita para o desafio
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/usuarios/**").permitAll() // Libera seus endpoints
                        .anyRequest().permitAll() // Garante que nada bloqueie o front agora
                )
                .httpBasic(Customizer.withDefaults()); // Mantém básico se precisar

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
