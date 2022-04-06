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
        User user = userRepository.findByEmailAndActivateTrue(username);
        if (username != "deleteUser" && user != null) {
            return new PrincipalDetails(user);
        }
        // 요청에 해당하는 user를 찾지 못하면 여기에 도달
        throw new UsernameNotFoundException("User not found in the database");
    }
}
