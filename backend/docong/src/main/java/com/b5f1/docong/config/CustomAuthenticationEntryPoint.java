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

    // 401 (UnAuthorized exception) error 발생시 해당 로직을 타게된다.
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        log.error("UnAuthorized error : {}", e.getMessage());
        String exception = (String) request.getAttribute("exception");
        System.out.println("CustomAuthenticationEntryPoint 진입 => " + exception);

        // response에 넣기
        setResponse(response, exception);
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
