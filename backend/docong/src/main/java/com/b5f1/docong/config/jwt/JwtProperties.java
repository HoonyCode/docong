package com.b5f1.docong.config.jwt;

public interface JwtProperties {
    int EXPIRATION_TIME = 1000*60*60*12; // 12시간
//    int EXPIRATION_TIME = 1000*60*30; // 30분
//    int EXPIRATION_TIME = 1000; // 1초
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
