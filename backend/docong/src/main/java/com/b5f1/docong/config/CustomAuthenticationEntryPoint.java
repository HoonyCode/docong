package com.b5f1.docong.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // JwtAuthorizationFilter에서 JWT 인증(유효한지 등) 중 Exception 발생 시 해당 메서드가 불려진다.
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        log.error("UnAuthorized error : {}", e.getMessage());
        String exception = (String) request.getAttribute("exception");
        System.out.println("CustomAuthenticationEntryPoint 진입 => " + exception);

        if("token expired".equals(exception)) {
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpStatus.SERVICE_UNAVAILABLE.value());
            response.getWriter().println("{ \"message\" : \"" + exception
                    + "\", \"code\" : \"" + HttpStatus.UNAUTHORIZED.value()
                    + "\", \"status\" : " + HttpStatus.UNAUTHORIZED.name()
                    + ", \"errors\" : [ ] }");
        }
        // response에 넣기
        else {
            setResponse(response, exception);
        }
    }

    private void setResponse(HttpServletResponse response, String exception) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().println("{ \"message\" : \"" + exception
                + "\", \"code\" : \"" + HttpStatus.UNAUTHORIZED.value()
                + "\", \"status\" : " + HttpStatus.UNAUTHORIZED.name()
                + ", \"errors\" : [ ] }");
    }
}
