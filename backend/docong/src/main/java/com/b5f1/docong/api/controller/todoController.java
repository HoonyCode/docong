package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.request.ModifyTodoStatusReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.response.BaseResponseEntity;
import com.b5f1.docong.api.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseEntity> deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponseEntity> modifyTodo(@PathVariable Long id, @RequestBody @Valid SaveTodoReqDto reqDto){
        todoService.modifyTodo(id, reqDto);
        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<BaseResponseEntity> modifyStatus(@PathVariable Long id, @RequestBody @Valid ModifyTodoStatusReqDto reqDto){
        todoService.modifyStatus(id, reqDto);
        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }
}
