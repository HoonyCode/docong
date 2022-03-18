package com.b5f1.docong.config;

import com.b5f1.docong.config.jwt.JwtAuthenticationFilter;
import com.b5f1.docong.config.jwt.JwtAuthorizationFilter;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${spring.jwt.secret}")
    public String secret;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .addFilter(corsConfig.corsFilter())
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                /*
                    AuthenticationEntryPoint (401 error) : 인증되지 않은 유저가 요청을 했을 시 동작 -> 이 코드 추가하면 /api/login 404 error
                    AccessDeniedHandler (403 error) : 서버에 요청을 할 때 엑세스가 가능한지 권한을 체크 후 엑세스 할 수 없는 요청을 했을 시 동작
                 */
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and()

                .addFilterBefore(new JwtAuthenticationFilter(authenticationManager(), secret), UsernamePasswordAuthenticationFilter.class)
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository, secret))

                .httpBasic().disable()
                .formLogin()
                .usernameParameter("email")
                .passwordParameter("password")
                .loginProcessingUrl("/user/login")
                .and()

                .authorizeRequests()
                .antMatchers("/user/info", "/user/delete")
                .access("hasRole('ROLE_USER')")
                .anyRequest().permitAll();

    }
}
