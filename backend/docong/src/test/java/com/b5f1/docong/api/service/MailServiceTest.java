package com.b5f1.docong.api.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.Access;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MailServiceTest {


    @Autowired
    MailService mailService;

    String to = "rladudgns456@naver.com";


    @Test
    void 메일전송테스트() {

        //given
        String subject = "Docong 가입";
        String content = "docong 가입을 축하합니다";

        //when
        mailService.sendSimpleMail(to, subject, content);

    }

    @Test
    void 인증번호보내기() {

        //given
        String subject = "Docong 인증번호 안내";
        String content = "Docong 인증번호는 : " + mailService.getCertificationNumber(4) + " 입니다";

        //then
        mailService.sendHtmlMail(to, subject, content);

    }


    @Test
    void 비밀번호보내기() {

        //given
        String subject = "Docong 비밀번호 안내";
        String content = "Docong 비밀번호는 : " + mailService.getRandomPassword(8) + " 입니다";

        //then
        mailService.sendSimpleMail(to, subject, content);
    }
}