package com.b5f1.docong.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GoogleLoginResDto {
    String jwtToken;
    String refreshToken;
    boolean newUser;
}
