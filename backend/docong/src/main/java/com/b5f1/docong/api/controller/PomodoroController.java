package com.b5f1.docong.api.controller;


import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.dto.response.BaseResponseEntity;
import com.b5f1.docong.api.service.PomodoroService;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
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
    public ResponseEntity<BaseResponseEntity> savePomodoro(@RequestBody @Valid SavePomodoroReqDto reqDto) {
        pomodoroService.savePomodoro(reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping("/{user_seq}")
    public ResponseEntity<List<Pomodoro>> findAllPomodoro(@RequestBody @PathVariable Long user_seq) {
        List<Pomodoro> result = pomodoroService.findAll(user_seq);
        return ResponseEntity.ok().body(result);
    }
}
