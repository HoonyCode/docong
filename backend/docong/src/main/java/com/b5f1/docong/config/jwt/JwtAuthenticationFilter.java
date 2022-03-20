package com.b5f1.docong.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.b5f1.docong.api.dto.request.LoginReqDto;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.config.SecurityConfig;
import com.b5f1.docong.config.auth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.parameters.P;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    /*
        Authentication 객체 만들어서 return => 의존 : AuthenticationManager
        인증 요청 시 실행되는 함수 => /login
     */
    private final AuthenticationManager authenticationManager;
    private final String secret;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, String secret) {
        super("/user/login");
        this.authenticationManager = authenticationManager;
        this.secret = secret;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException {
        System.out.println("JwtAuthenticationFilter 진입");

        try {
            // request에 있는 username과 password를 파싱해서 자바 Object로 받기
            ObjectMapper om = new ObjectMapper();
            LoginReqDto loginReqDto = om.readValue(request.getInputStream(), LoginReqDto.class);

            System.out.println("JwtAuthenticationFilter : " + loginReqDto);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword());

            System.out.println("JwtAuthenticaionFilter : 토큰 생성 완료");

            Authentication authentication = authenticationManager.authenticate(authenticationToken); // 여기서 PrincipalDetailsService 진입

            System.out.println("authentication? -> " + authentication);

            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println("Authentication : " + principalDetails.getUser().getEmail());

            return authentication;
        } catch (BadCredentialsException e) {
            System.out.println("BadCredentialsException 발생!");
            sendErrorResponse(response, "BadCredentialsException");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setStatus(ErrorCode.USER_NOT_FOUND.getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().println("{ \"message\" : \"" + message
                + "\", \"code\" : \"" + ErrorCode.USER_NOT_FOUND.getHttpStatus().value()
                + "\", \"status\" : " + ErrorCode.USER_NOT_FOUND.getHttpStatus().name()
                + ", \"errors\" : [ ] }");
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", principalDetails.getUser().getSeq())
                .withClaim("email", principalDetails.getUser().getEmail())
                .sign(Algorithm.HMAC512(secret));

        System.out.println("JWT TOKEN : " + jwtToken);
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
    }
}
