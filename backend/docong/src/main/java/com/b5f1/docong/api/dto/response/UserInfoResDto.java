package com.b5f1.docong.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoResDto {
    String email;
    String name;
    String birth;
    String gender;
    String address;
    String job;
    String position;

}
