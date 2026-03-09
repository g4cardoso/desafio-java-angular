package com.desafio.usermanagement.service;

import com.desafio.usermanagement.dto.UserRequestDTO;
import com.desafio.usermanagement.dto.UserResponseDTO;
import com.desafio.usermanagement.model.User;
import com.desafio.usermanagement.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserResponseDTO registrarUsuario(UserRequestDTO dto) {

        if (userRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("Este e-mail já está cadastrado!");
        }

        if (!dto.senha().equals(dto.confirmacaoSenha())) {
            throw new IllegalArgumentException("As senhas não coincidem!");
        }
        User user = new User();
        user.setNome(dto.nome());
        user.setEmail(dto.email());
        user.setSenha(passwordEncoder.encode(dto.senha()));

        var userSalvo = userRepository.save(user);
        return new UserResponseDTO(userSalvo);
    }

    public List<User> listarTodos() {
        return userRepository.findAll();
    }

    public UserResponseDTO atualizarUsuario(Long id, UserRequestDTO dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("usuario nao encontrado"));

        Optional<User> usuarioComMesmoEmail = userRepository.findByEmail(dto.email());

        if (usuarioComMesmoEmail.isPresent() && !usuarioComMesmoEmail.get().getId().equals(id)) {
            throw new IllegalArgumentException("Este e-mail já está cadastrado!");// Aqui gera o erro 400
        }

        if (!dto.senha().equals(dto.confirmacaoSenha())) {
            throw new IllegalArgumentException("As senhas não coincidem!");
        }

        user.setNome(dto.nome());
        user.setEmail(dto.email());
        user.setSenha(passwordEncoder.encode(dto.senha()));
        var userSalvo = userRepository.save(user);
        return new UserResponseDTO(userSalvo);
    }

    public void deletarUsuario(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("usuario nao encontrado");
        }
        userRepository.deleteById(id);
    }

    public UserResponseDTO buscarPorId(Long id) {
        var userSalvo = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
        return new UserResponseDTO(userSalvo);
    }
}
