package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoReqDto {
    String password;
    String name;
    String birth;
    String gender;
    String address;
    String job;
    String position;
}
