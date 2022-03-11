package com.b5f1.docong.config;

import com.b5f1.docong.config.jwt.JwtAuthenticationFilter;
import com.b5f1.docong.config.jwt.JwtAuthorizationFilter;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // 시큐리티 활성화 -> 기본 스프링 필터체인에 등록
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CorsConfig corsConfig;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(new JwtAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);
        http
                .addFilter(corsConfig.corsFilter())
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                //.addFilter(new JwtAuthenticationFilter(authenticationManager())) // formLogin()을 사용하면 security에서 기본적으로 불러줌
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
                .httpBasic().disable()
                .formLogin()
                //.loginPage("/api/login") // 로그인을 하고자하는 위치
                .usernameParameter("email")
                .passwordParameter("password")
                .loginProcessingUrl("/user/login")
                .and()
                .authorizeRequests()
                .anyRequest().permitAll();

    }
}
