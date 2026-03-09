package com.desafio.usermanagement.service;

import com.desafio.usermanagement.dto.UserRequestDTO;
import com.desafio.usermanagement.dto.UserResponseDTO;
import com.desafio.usermanagement.model.User;
import com.desafio.usermanagement.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;


    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    private UserRequestDTO userRequestDTO;

    @BeforeEach
    void setUp() {
        userRequestDTO = new UserRequestDTO("Gabriel Cardoso",
                "gabriel@example.com",
                "123456",
                "123456");
    }

    @Test
    void deveSalvarUsuarioComSucesso() {
        User userSalvo = new User();
        userSalvo.setId(1L);
        userSalvo.setNome(userRequestDTO.nome());

        when(userRepository.save(any(User.class))).thenReturn(userSalvo);

        UserResponseDTO resultado = userService.registrarUsuario(userRequestDTO);

        assertNotNull(resultado);
        assertEquals("Gabriel Cardoso", resultado.nome());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void deveLancarExcecaoQuandoSenhasDiferentes() {
        userRequestDTO = new UserRequestDTO("Gabriel Cardoso",
                "gabriel@example.com",
                "123456",
                "654321");

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.registrarUsuario(userRequestDTO);
        });

        assertEquals("As senhas não coincidem!", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Deve retornar lista de usuários")
    void deveListarUsuarios() {
        when(userRepository.findAll()).thenReturn(Collections.singletonList(new User()));
        List<User> lista = userService.listarTodos();
        assertFalse(lista.isEmpty());
    }

    @Test
    void deveAtualizarUsuarioComSucesso() {
        Long id = 1L;
        UserRequestDTO dto = new UserRequestDTO("Novo Nome", "novo@email.com", "654321", "654321");
        User userExistente = new User();
        userExistente.setId(id);

        when(userRepository.findById(id)).thenReturn(Optional.of(userExistente));
        when(userRepository.save(any(User.class))).thenReturn(userExistente);

        UserResponseDTO atualizado = userService.atualizarUsuario(id, dto);

        assertEquals("Novo Nome", atualizado.nome());
    }

    @Test
    void deveErroAtualizarInexistente() {
        UserRequestDTO dto = new UserRequestDTO("Nome", "a@a.com", "123456", "123456");
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.atualizarUsuario(1L, dto));
    }

    @Test
    void deveDeletarComSucesso() {
        when(userRepository.existsById(1L)).thenReturn(true);
        assertDoesNotThrow(() -> userService.deletarUsuario(1L));
        verify(userRepository).deleteById(1L);
    }

    @Test
    void deveErroDeletarInexistente() {
        when(userRepository.existsById(1L)).thenReturn(false);
        assertThrows(RuntimeException.class, () -> userService.deletarUsuario(1L));
    }
}
