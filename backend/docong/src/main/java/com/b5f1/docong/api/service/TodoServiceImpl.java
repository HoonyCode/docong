package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.UserTodo;
import com.b5f1.docong.core.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoServiceImpl implements TodoService{
    private final TodoRepository todoRepository;

    @Override
    public Long saveTodo(SaveTodoReqDto reqDto) {
        Todo todo = reqDto.toEntity();
        UserTodo userTodo = UserTodo.builder().build();
        todo.addUserTodo(userTodo);
        return todoRepository.save(todo).getSeq();
    }
}
