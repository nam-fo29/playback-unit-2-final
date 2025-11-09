package com.playback.DTOs;

public class UserDTO {
    private String username;
    private boolean isAuthenticated;

    public UserDTO() {
    }

    public UserDTO(String username, boolean isAuthenticated) {
        this.username = username;
        this.isAuthenticated = isAuthenticated;
    }
    public String getUsername() {
        return username;
    }

    public boolean isAuthenticated() {
        return isAuthenticated;
    }
}
