package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.JoinReqDto;
import com.b5f1.docong.api.dto.request.UserInfoReqDto;
import com.b5f1.docong.api.dto.response.UserInfoResDto;
import com.b5f1.docong.core.domain.user.User;

public interface UserService {
    void join(JoinReqDto joinReqDto);

    UserInfoResDto getUserInfo(Long seq);

    void setUserInfo(User user, UserInfoReqDto userInfoReqDto);

    void deleteUser(User user);

    boolean checkEmail(String email);

    String newToken(String expiredAuthorization);
}
