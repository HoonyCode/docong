package com.b5f1.docong.config.auth;

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
        if (username != "deleteUser" && user != null) {
            System.out.println("loadUserByUsername 진입, email : " + username);
            return new PrincipalDetails(user);
        }
        return null;
    }
}
