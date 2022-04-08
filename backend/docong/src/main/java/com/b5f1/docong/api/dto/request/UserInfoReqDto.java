package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoReqDto {
    String name;
    String birth;
    String gender;
    String mbti;
    String job;
    String position;
    String image;
}
