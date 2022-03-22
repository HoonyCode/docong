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
        System.out.println("GoogleJwtCreate 실행됨");
        System.out.println(data.get("profileObj"));

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
                    .build();

            userEntity = userRepository.save(userRequest);
            newUser = true;
        }

        String jwtToken = JWT.create()
                .withSubject(userEntity.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", userEntity.getSeq())
                .withClaim("email", userEntity.getEmail())
                .sign(Algorithm.HMAC512(secret));

        System.out.println("Google JWT Token : " + jwtToken);
        GoogleLoginResDto googleLoginResDto = new GoogleLoginResDto(jwtToken,newUser);
        return ResponseEntity.ok().body(googleLoginResDto);
    }

}
