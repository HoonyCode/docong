package com.b5f1.docong.api.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class JoinReqDto {
    @NotNull
    String email;
    @NotNull
    String password;
    String name;
    String birth;
    String gender;
    String mbti;
    String job;
    String position;
}
