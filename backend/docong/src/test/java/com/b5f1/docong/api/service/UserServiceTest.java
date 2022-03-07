package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.UserInfoReqDto;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testChangeUserInfo() {
        User user = userRepository.findByEmail("test@naver.com");
        UserInfoReqDto userInfoReqDto =
                new UserInfoReqDto("1234","혜승", "2005-11-23", "M", "Busan", "student", "student");

        userService.setUserInfo(user, userInfoReqDto);
        user = userRepository.findByEmail("test@naver.com");

        assertThat(user.getName()).isEqualTo("혜승");
    }
}
