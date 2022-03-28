package com.b5f1.docong.api.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    INVALID_EMAIL_FORMAT(HttpStatus.BAD_REQUEST, "Google 이메일 가입은 Google 로그인을 이용하세요."),
    NULL_PASSWORD(HttpStatus.BAD_REQUEST, "Password 값이 null 입니다."),
    NULL_USER(HttpStatus.BAD_REQUEST, "User 헤더가 필요합니다."),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "권한 정보가 없는 토큰입니다."),
    WRONG_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 불일치합니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 Refresh Token입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 Token입니다."),
    INVALID_USER(HttpStatus.UNAUTHORIZED, "권한이 없는 사용자입니다."),

    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 사용자를 찾을 수 없습니다."),
    TEAM_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 Team을 찾을 수 없습니다."),
    TEAM_USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 TeamUser을 찾을 수 없습니다."),
    TODO_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 ToDo를 찾을 수 없습니다."),
    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "요청 헤더에 토큰이 없습니다"),

    /* 406 */

    /* 409 : CONFLICT : Resource의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다."),

    ;

    private final HttpStatus httpStatus;
    private final String detail;
}
