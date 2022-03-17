package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.request.ModifyTodoStatusReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.response.BaseResponseEntity;
import com.b5f1.docong.api.dto.response.FindTodoResDto;
import com.b5f1.docong.api.resolver.Auth;
import com.b5f1.docong.api.service.TodoService;
import com.b5f1.docong.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/{id}")
    public ResponseEntity<FindTodoResDto> findTodo(@PathVariable Long id){
        FindTodoResDto response = todoService.findTodo(id);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/user")
    public ResponseEntity<List<FindTodoResDto>> findUserTodos(@Auth User user){
        List<FindTodoResDto> response = todoService.findUserTodos(user.getSeq());
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<List<FindTodoResDto>> findGroupTodos(@PathVariable Long id){
        List<FindTodoResDto> response = todoService.findGroupTodos(id);
        return ResponseEntity.status(200).body(response);
    }

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
