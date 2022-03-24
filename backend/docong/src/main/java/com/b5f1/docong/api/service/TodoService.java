package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.ModifyTodoActivateReqDto;
import com.b5f1.docong.api.dto.request.ModifyTodoStatusReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.response.FindTodoResDto;

import java.util.List;

public interface TodoService {
    Long saveTodo(SaveTodoReqDto reqDto);
    void deleteTodo(Long id);
    void modifyTodo(Long id, SaveTodoReqDto reqDto);
    void modifyStatus(Long id, ModifyTodoStatusReqDto reqDto);
    void modifyActivate(Long id, ModifyTodoActivateReqDto reqDto);
    FindTodoResDto findTodo(Long id);
    List<FindTodoResDto> findUserTodos(Long userSeq);
    List<FindTodoResDto> findGroupTodos(Long id);
}
