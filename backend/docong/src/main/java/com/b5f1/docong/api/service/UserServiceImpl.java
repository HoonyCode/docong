package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.JoinReqDto;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    @Transactional
    public void join(JoinReqDto joinReqDto) {
        // email 중복체크
        User user = userRepository.findByEmail(joinReqDto.getEmail());

        if(user!=null) {
            // 에러 던지기
            System.out.println("이미 존재하는 email입니다.");
        }
        else if(user==null) {
            user = User.builder()
                    .email(joinReqDto.getEmail())
                    .password(bCryptPasswordEncoder.encode(joinReqDto.getPassword()))
                    .name(joinReqDto.getName())
                    .birth(joinReqDto.getBirth())
                    .gender(joinReqDto.getGender())
                    .address(joinReqDto.getAddress())
                    .job(joinReqDto.getJob())
                    .position(joinReqDto.getPosition())
                    .activate(true)
                    .oauth_type("native")
                    .build();
            userRepository.save(user);
        }
    }
}
