package com.b5f1.docong.api.controller;


import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.dto.response.BaseResponseEntity;
import com.b5f1.docong.api.resolver.Auth;
import com.b5f1.docong.api.service.PomodoroService;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/pomo")
@RequiredArgsConstructor
public class PomodoroController {
    private final PomodoroService pomodoroService;


    @PostMapping
    public ResponseEntity<BaseResponseEntity> savePomodoro(@RequestBody @Valid SavePomodoroReqDto reqDto, @Auth User user) {
        pomodoroService.savePomodoro(reqDto, user);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping("/user")
    public ResponseEntity<List<Pomodoro>> findAllPomodoro(@Auth User user) {
        List<Pomodoro> result = pomodoroService.findAll(user.getSeq());
        return ResponseEntity.ok().body(result);
    }
}
