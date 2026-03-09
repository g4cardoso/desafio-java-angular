package com.desafio.usermanagement.controller;

import com.desafio.usermanagement.dto.ApiResponse;
import com.desafio.usermanagement.dto.UserRequestDTO;
import com.desafio.usermanagement.dto.UserResponseDTO;
import com.desafio.usermanagement.model.User;
import com.desafio.usermanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>> cadastro(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        var novoUsuario = userService.registrarUsuario(userRequestDTO);
        ApiResponse<UserResponseDTO> response = new ApiResponse<>(
                "usuario cadastrado com sucesso!!!", novoUsuario
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<User>> listar() {
        return ResponseEntity.ok(userService.listarTodos());

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> editar(@PathVariable Long id, @Valid @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO usuarioAtualizado = userService.atualizarUsuario(id, userRequestDTO);

        ApiResponse<UserResponseDTO> response = new ApiResponse<>(
                "usuario alterado com sucesso", usuarioAtualizado
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletar(@PathVariable Long id) {
        userService.deletarUsuario(id);

        ApiResponse<Void> response = new ApiResponse<>(
                "usuario alterado com sucesso", null
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> buscarPorId(@PathVariable Long id) {
        // Aqui você chama o seu service ou repository
        UserResponseDTO usuario = userService.buscarPorId(id);

        return ResponseEntity.ok(new ApiResponse<>(
                "Usuário encontrado com sucesso",
                usuario
        ));
    }
}
