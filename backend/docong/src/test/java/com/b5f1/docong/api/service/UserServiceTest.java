package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.UserInfoReqDto;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @BeforeEach
    void initialize() {
        User user = User.builder()
                .email("testcode@naver.com")
                .password(bCryptPasswordEncoder.encode("1234"))
                .name("테스트코드용")
                .birth("2022-03-15")
                .gender("F")
                .mbti("ISFP")
                .job("student")
                .position("student")
                .activate(true)
                .oauth_type("native")
                .image(null)
                .build();
        userRepository.save(user);
    }

    @Test
    void testChangeUserInfo() {
        User user = userRepository.findByEmailAndActivateTrue("testcode@naver.com");
        UserInfoReqDto userInfoReqDto =
                new UserInfoReqDto("혀승", "2005-11-23", "M", "ISFP", "student", "student", null);

        userService.setUserInfo(user, userInfoReqDto);
        user = userRepository.findByEmailAndActivateTrue("testcode@naver.com");

        assertThat(user.getName()).isEqualTo("혀승");
    }

    @Test
    void testDeleteUser() {
        User user = userRepository.findByEmailAndActivateTrue("testcode@naver.com");
        userService.deleteUser(user);

        assertThat(!user.isActivate());
    }
}
