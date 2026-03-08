package com.desafio.usermanagement.controller;

import com.desafio.usermanagement.dto.ApiResponse;
import com.desafio.usermanagement.dto.UserDTO;
import com.desafio.usermanagement.model.User;
import com.desafio.usermanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<ApiResponse<User>> cadastro(@Valid @RequestBody UserDTO userDTO) {
        var novoUsuario = userService.registrarUsuario(userDTO);
        ApiResponse<User> response = new ApiResponse<>(
                "usuario cadastrado com sucesso!!!", novoUsuario
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<User>> listar() {
        return ResponseEntity.ok(userService.listarTodos());

    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> editar(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        User usuarioAtualizado = userService.atualizarUsuario(id, userDTO);

        ApiResponse<User> response = new ApiResponse<>(
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
    public ResponseEntity<ApiResponse<User>> buscarPorId(@PathVariable Long id) {
        // Aqui você chama o seu service ou repository
        User usuario = userService.buscarPorId(id);

        return ResponseEntity.ok(new ApiResponse<>(
                "Usuário encontrado com sucesso",
                usuario
        ));
    }
}
