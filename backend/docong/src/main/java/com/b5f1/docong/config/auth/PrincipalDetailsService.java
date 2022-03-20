package com.b5f1.docong.config.auth;

import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService 진입");
        User user = userRepository.findByEmailAndActivateTrue(username);
        System.out.println("loadUserByUserName에서 찾는 user -> " + user);
        if (username != "deleteUser" && user != null) {
            System.out.println("loadUserByUsername 진입, email : " + username);
            return new PrincipalDetails(user);
        }
        // 요청에 해당하는 user를 찾지 못하면 여기에 도달
        System.out.println("loadUserByUserName -> 요청에 해당하는 user를 찾지 못했습니다.");

        return new PrincipalDetails(new User());
    }
}
