package com.b5f1.docong.api.controller;


import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.dto.response.BaseResponseEntity;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.api.resolver.Auth;
import com.b5f1.docong.api.service.PomodoroService;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.user.User;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.validation.Valid;
import java.util.List;

@Api(tags = {"뽀모도로"})
@RestController
@RequestMapping(value = "/pomo")
@RequiredArgsConstructor
public class PomodoroController {
    private final PomodoroService pomodoroService;


    @PostMapping
    @ApiOperation(value = "뽀모도로 저장하기", notes = "뽀모도로에 필요한 데이터를 저장합니다.")
    public ResponseEntity<BaseResponseEntity> savePomodoro(@Auth @ApiParam(hidden = true) User user, @RequestBody @Valid SavePomodoroReqDto reqDto) {

        // 예외 처리
        if (user == null) throw new CustomException(ErrorCode.NULL_USER);

        pomodoroService.savePomodoro(reqDto, user);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping
    @ApiOperation(value = "뽀모도로 가져오기", notes = "해당 유저의 모든 뽀모도로 정보를 가져옵니다.")
    public ResponseEntity<List<Pomodoro>> findAllPomodoro(@Auth @ApiParam(hidden = true) User user) {
        if (user == null) throw new CustomException(ErrorCode.NULL_USER);

        List<Pomodoro> result = pomodoroService.findAll(user.getSeq());
        return ResponseEntity.ok().body(result);
    }
}
