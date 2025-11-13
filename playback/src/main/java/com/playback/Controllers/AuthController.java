package com.playback.Controllers;


import com.playback.DTOs.AuthRequestDTO;
import com.playback.DTOs.AuthResponse;
import com.playback.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequestDTO request) throws Exception {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequestDTO request) throws Exception {
        return authService.login(request);
    }

    @GetMapping("/status")
    public boolean checkStatus() {
        return true;
    }
}
