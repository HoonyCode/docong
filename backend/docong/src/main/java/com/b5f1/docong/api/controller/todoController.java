package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.response.BaseResponseEntity;
import com.b5f1.docong.api.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class todoController {
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<BaseResponseEntity> saveTodo(@RequestBody @Valid SaveTodoReqDto reqDto){
        todoService.saveTodo(reqDto);
        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }
}
