package com.b5f1.docong.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.b5f1.docong.config.auth.PrincipalDetails;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;
    private String secret;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, String secret) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.secret = secret;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 어느 요청이 들어오던 해당 메서드를 거친다. -> Authorization(JWT)이 유효한지 체크
        System.out.println("JwtAuthorizationFilter 진입");
        String header = request.getHeader(JwtProperties.HEADER_STRING);
        System.out.println("header Authorization : " + header);

        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        try {
            String token = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
            String email = JWT.require(Algorithm.HMAC512(secret)).build().verify(token) // 여기서 token 유효성 검사를 거침(verify(token))
                    .getClaim("email").asString();
            if (email != null) {
                User user = userRepository.findByEmailAndActivateTrue(email);

                PrincipalDetails principalDetails = new PrincipalDetails(user);
                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

                // 강제로 시큐리티 세션에 접근하여 값 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        catch (TokenExpiredException e) {
            request.setAttribute("exception", "token expired");
        }
        catch(JWTDecodeException e) {
            request.setAttribute("exception", "wrong token");
        }
        chain.doFilter(request, response);
    }
}
