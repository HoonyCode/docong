package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.TodoStatus;
import com.b5f1.docong.core.repository.TodoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TodoServiceTest {
    @Autowired
    private TodoService todoService;

    @Autowired
    private TodoRepository todoRepository;

    @Test
    void testSaveTodo() {
        // given
        SaveTodoReqDto reqDto = new SaveTodoReqDto("제목","내용",null,null,null,null);

        // when
        Long todoSeq = todoService.saveTodo(reqDto);

        // then
        Todo findTodo = todoRepository.findById(todoSeq).orElseThrow(()->new IllegalStateException("없는 Todo입니다"));

        assertThat(findTodo.getTitle()).isEqualTo("제목");
        assertThat(findTodo.getStatus()).isEqualTo(TodoStatus.TODO);
        assertThat(findTodo.getUserTodos().size()).isEqualTo(1);
        assertThat(findTodo.getUserTodos().get(0).getTodo()).isEqualTo(findTodo);
    }
}