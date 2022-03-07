package com.b5f1.docong.api.controller;


import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.dto.response.BaseResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/pomo")
@RequiredArgsConstructor
public class PomodoroController {

    @PostMapping
    public ResponseEntity<BaseResponseEntity> savePomo(@RequestBody @Valid SavePomodoroReqDto reqDto) {

        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping("/{user_seq}")
    public ResponseEntity<BaseResponseEntity> findAllPomo(@RequestBody @PathVariable String user_seq) {


        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }
}
