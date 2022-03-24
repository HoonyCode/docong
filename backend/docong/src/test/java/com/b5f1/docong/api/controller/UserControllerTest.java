package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserControllerTest {

    @Autowired
    UserController userController;


    @Test
    void 이메일인증() {
        userController.certificationEmail("rladudgns456@naver.com");
    }

    @Test
    void 비밀번호수정_유저가존재하지않을때() {

        //given
        String to = "zxvczxvaff@naver.com";

        //when
        CustomException customException = assertThrows(CustomException.class, () -> {
            userController.searchPassword(to);
        });

        org.assertj.core.api.Assertions.assertThat(customException.getErrorCode()).isEqualTo(ErrorCode.USER_NOT_FOUND);
    }

//    @Test
//    void 비밀번호수정_유저가존재할때() {
//
//        //given
//        String to = "rladudgns456@naver.com";
//
//        userController.searchPassword(to);
//    }
}