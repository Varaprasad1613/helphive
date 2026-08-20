package com.helphive.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class HelpHiveApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelpHiveApplication.class, args);
    }
}
