package com.b5f1.docong.config.jwt;

public interface JwtProperties {
    int EXPIRATION_TIME = 1000*60*60*12; // 12시간
//    int EXPIRATION_TIME = 1000*60*5; // 5분
//    int EXPIRATION_TIME = 1000*30; // 30초
//    int EXPIRATION_TIME = 1000*10; // 10초
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";

    // Refresh Token
    int REFRESH_EXPIRATION_TIME = 1000*60*60*24*7*2; // 2주 (14일)
//    int REFRESH_EXPIRATION_TIME = 1000*60; // 1분
    String REFRESH_TOKEN_HEADER_STRING = "RefreshToken";
}
