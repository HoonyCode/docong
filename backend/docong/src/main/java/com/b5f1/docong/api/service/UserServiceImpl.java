package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.JoinReqDto;
import com.b5f1.docong.api.dto.request.UserInfoReqDto;
import com.b5f1.docong.api.dto.response.UserInfoResDto;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void join(JoinReqDto joinReqDto) {
        // gmail 가입 시도 시 oAuth를 이용해달라고 하기
        String emailPart = joinReqDto.getEmail().trim().split("@")[1];
        if (emailPart.equals("gmail.com")) {
            // 에러 던지기
//            System.out.println("gmail은 Google 로그인을 이용해주세요.");
            throw new CustomException(ErrorCode.INVALID_EMAIL_FORMAT);
        } else {
            User user = User.builder()
                    .email(joinReqDto.getEmail())
                    .password(bCryptPasswordEncoder.encode(joinReqDto.getPassword()))
                    .name(joinReqDto.getName())
                    .birth(joinReqDto.getBirth())
                    .gender(joinReqDto.getGender())
                    .mbti(joinReqDto.getMbti())
                    .job(joinReqDto.getJob())
                    .position(joinReqDto.getPosition())
                    .activate(true)
                    .oauth_type("native")
                    .build();
            userRepository.save(user);
        }
    }

    @Override
    public UserInfoResDto getUserInfo(Long seq) {

        User user = userRepository.findById(seq).get();

        UserInfoResDto userRes =
                new UserInfoResDto(user.getEmail(), user.getName(), user.getBirth(), user.getGender(), user.getMbti(), user.getJob(), user.getPosition());

        return userRes;
    }

    @Override
    public void setUserInfo(User user, UserInfoReqDto userInfoReqDto) {
        User userEntity = userRepository.findById(user.getSeq()).get();

        // user entity의 메서드 불러와서 set한 후 save
        userEntity.updateUserInfo(userInfoReqDto);
    }

    @Override
    public void deleteUser(User user) {
        // user의 activate를 false로 변경
        // user의 email 변경
        user.deleteUser();

        userRepository.save(user);
    }

    @Override
    public boolean checkEmail(String email) {

        User existUser = userRepository.findByEmailAndActivateTrue(email);

        if (existUser == null) {
            return true;
        } else if (existUser != null) {
            return false;
        }

        return false;
    }
}
