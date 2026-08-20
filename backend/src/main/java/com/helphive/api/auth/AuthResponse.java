package com.helphive.api.auth;

public record AuthResponse(String token, UserResponse user) {}
