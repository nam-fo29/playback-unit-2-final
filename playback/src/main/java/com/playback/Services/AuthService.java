package com.playback.Services;


import com.playback.DTOs.AuthRequestDTO;
import com.playback.DTOs.AuthResponse;
import com.playback.Models.UserModel;
import com.playback.Repositories.UserRepository;
import com.playback.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse register(AuthRequestDTO request) throws Exception {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new Exception("Username already exists");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        UserModel newUser = new UserModel(request.getUsername(), hashedPassword);
        userRepository.save(newUser);

        String token = jwtUtil.generateToken(newUser);

        return new AuthResponse(token);

    }

    public AuthResponse login(AuthRequestDTO request) throws Exception {
        UserModel user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new Exception("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new Exception("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user);

        return new AuthResponse(token);
    }
}
