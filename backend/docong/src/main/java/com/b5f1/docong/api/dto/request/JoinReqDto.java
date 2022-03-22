package com.b5f1.docong.api.dto.request;

import lombok.Data;

@Data
public class JoinReqDto {
    String email;
    String password;
    String name;
    String birth;
    String gender;
    String mbti;
    String job;
    String position;
}
