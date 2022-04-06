package com.b5f1.docong.api.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.b5f1.docong.api.dto.response.GoogleLoginResDto;
import com.b5f1.docong.config.jwt.JwtProperties;
import com.b5f1.docong.config.oauth.provider.GoogleUser;
import com.b5f1.docong.config.oauth.provider.OAuthUserInfo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class GoogleUserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${spring.jwt.secret}")
    public String secret;

    @PostMapping("/oauth/jwt/google")
    public ResponseEntity<GoogleLoginResDto> GoogleJwtCreate(@RequestBody Map<String, Object> data) {
        OAuthUserInfo googleUser = new GoogleUser((Map<String, Object>) data.get("profileObj"));

        User userEntity = userRepository.findByEmailAndActivateTrue(googleUser.getEmail());

        boolean newUser = false;

        if (userEntity == null) {
            User userRequest = User.builder()
                    .email(googleUser.getEmail())
                    .password(bCryptPasswordEncoder.encode("Docong789456"))
                    .name(googleUser.getName())
                    .birth(null)
                    .gender(null)
                    .mbti(null)
                    .job(null)
                    .position(null)
                    .activate(true)
                    .oauth_type(googleUser.getProvider())
                    .image(googleUser.getImage())
                    .build();

            userEntity = userRepository.save(userRequest);
            newUser = true;
        }

        // Access Token 발급
        String jwtToken = JWT.create()
                .withSubject(userEntity.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", userEntity.getSeq())
                .withClaim("email", userEntity.getEmail())
                .sign(Algorithm.HMAC512(secret));

        // Refresh Token 발급
        String refreshToken = JWT.create()
                .withSubject(userEntity.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME))
                .withClaim("email", userEntity.getEmail())
                .sign(Algorithm.HMAC512(secret));
        // Refresh Token - DB에 저장
        userEntity.saveRefreshToken(refreshToken);
        userRepository.save(userEntity);

        GoogleLoginResDto googleLoginResDto = new GoogleLoginResDto(jwtToken, refreshToken, newUser);
        return ResponseEntity.ok().body(googleLoginResDto);
    }

}
