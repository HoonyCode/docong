package com.b5f1.docong.api.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.b5f1.docong.api.dto.request.JoinReqDto;
import com.b5f1.docong.api.dto.request.UserInfoReqDto;
import com.b5f1.docong.api.dto.response.UserInfoResDto;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.config.jwt.JwtProperties;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${spring.jwt.secret}")
    public String secret;

    @Override
    public void join(JoinReqDto joinReqDto) {
        // gmail 가입 시도 시 oAuth를 이용해달라고 하기
        String emailPart = joinReqDto.getEmail().trim().split("@")[1];
        if (emailPart.equals("gmail.com")) {
            // 에러 던지기
//            System.out.println("gmail은 Google 로그인을 이용해주세요.");
            throw new CustomException(ErrorCode.INVALID_EMAIL_FORMAT);
        } else {
            User user = User.builder()
                    .email(joinReqDto.getEmail())
                    .password(bCryptPasswordEncoder.encode(joinReqDto.getPassword()))
                    .name(joinReqDto.getName())
                    .birth(joinReqDto.getBirth())
                    .gender(joinReqDto.getGender())
                    .mbti(joinReqDto.getMbti())
                    .job(joinReqDto.getJob())
                    .position(joinReqDto.getPosition())
                    .activate(true)
                    .oauth_type("native")
                    .image(null)
                    .build();
            userRepository.save(user);
        }
    }

    @Override
    public UserInfoResDto getUserInfo(Long seq) {

        User user = userRepository.findById(seq).get();

        UserInfoResDto userRes =
                new UserInfoResDto(user.getEmail(), user.getName(), user.getBirth(), user.getGender(), user.getMbti(), user.getJob(), user.getPosition(), user.getImage());

        return userRes;
    }

    @Override
    public void setUserInfo(User user, UserInfoReqDto userInfoReqDto) {
        User userEntity = userRepository.findById(user.getSeq()).get();

        // user entity의 메서드 불러와서 set한 후 save
        userEntity.updateUserInfo(userInfoReqDto);
    }

    @Override
    public void deleteUser(User user) {
        // user의 activate를 false로 변경
        // user의 email 변경
        user.deleteUser();

        userRepository.save(user);
    }

    @Override
    public boolean checkEmail(String email) {

        User existUser = userRepository.findByEmailAndActivateTrue(email);

        if (existUser == null) {
            return true;
        } else if (existUser != null) {
            return false;
        }

        return false;
    }

    @Override
    public void changePassword(String email, String password) {
        User user = userRepository.findByEmailAndActivateTrue(email);

        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        user.changePassword(bCryptPasswordEncoder.encode(password));
    }

    public String newToken(String expiredAuthorization) {
        if (expiredAuthorization != null && expiredAuthorization.startsWith("Bearer ")) {
            try {
                String refreshToken = expiredAuthorization.replace(JwtProperties.TOKEN_PREFIX, ""); // Bearer 를 제외한 나머지를 refreshToken으로 저장
                String email = JWT.require(Algorithm.HMAC512(secret)).build().verify(refreshToken)
                        .getClaim("email").asString();
                System.out.println("email-> " + email);

                User user = userRepository.findByEmailAndActivateTrue(email);

                // user의 refreshToken이 맞는지 확인하기
                if (!user.getRefresh_token().equals(refreshToken)) {
                    throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
                }

                String newToken = JWT.create()
                        .withSubject(user.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                        .withClaim("id", user.getSeq())
                        .withClaim("email", user.getEmail())
                        .sign(Algorithm.HMAC512(secret));

                return "Bearer " + newToken;
            } catch (TokenExpiredException e) {
                // Refresh Token이 만료되었을 때 (Expired Refresh Token 에러코드 만들기)
                throw new CustomException(ErrorCode.EXPIRED_REFRESH_TOKEN);
            } catch (SignatureVerificationException e) {
                // Refresh Token 값이 잘못되었을 때
                throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
            }
        }
        // 토큰이 없거나 정해진 형식을 따르지 않은 토큰일 때
        throw new CustomException(ErrorCode.TOKEN_NOT_FOUND);
    }
}
