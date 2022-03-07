package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.ModifyTodoStatusReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.TodoStatus;
import com.b5f1.docong.core.domain.todo.UserTodo;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserTodoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TodoServiceTest {
    @Autowired
    private TodoService todoService;

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserTodoRepository userTodoRepository;

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

    @Test
    void testDeleteTodo() {
        // given
        Todo todo = Todo.builder().title("제목").content("내용").build();
        UserTodo userTodo = UserTodo.builder().build();
        todo.addUserTodo(userTodo);

        Todo savedTodo = todoRepository.save(todo);
        UserTodo savedUserTodo = savedTodo.getUserTodos().get(0);

        // when
        todoService.deleteTodo(savedTodo.getSeq());

        // then
        assertThatThrownBy(()-> {
            todoRepository.findById(savedTodo.getSeq()).orElseThrow(() -> new IllegalStateException());
        }).isInstanceOf(IllegalStateException.class);
        assertThatThrownBy(()-> {
            userTodoRepository.findById(savedUserTodo.getSeq()).orElseThrow(() -> new IllegalStateException());
        }).isInstanceOf(IllegalStateException.class);
    }

    @Test
    void testModifyTodo() {
        // given
        Todo todo = Todo.builder().title("제목").content("내용").build();
        Todo savedTodo = todoRepository.save(todo);
        SaveTodoReqDto reqDto = new SaveTodoReqDto("제목수정","내용수정",null,null,null,null);

        // when
        todoService.modifyTodo(savedTodo.getSeq(), reqDto);

        // then
        Todo findTodo = todoRepository.findById(savedTodo.getSeq()).orElseThrow(()->new IllegalStateException("없는 Todo입니다"));
        assertThat(findTodo.getTitle()).isEqualTo("제목수정");
        assertThat(findTodo.getContent()).isEqualTo("내용수정");
    }

    @Test
    void testModifyStatus() {
        // given
        Todo todo = Todo.builder().title("제목").content("내용").status(TodoStatus.TODO).build();
        Todo savedTodo = todoRepository.save(todo);
        ModifyTodoStatusReqDto reqDto = new ModifyTodoStatusReqDto(TodoStatus.IN_PROGRESS);

        // when
        todoService.modifyStatus(savedTodo.getSeq(), reqDto);

        // then
        Todo findTodo = todoRepository.findById(savedTodo.getSeq()).orElseThrow(()->new IllegalStateException("없는 Todo입니다"));
        assertThat(findTodo.getStatus()).isEqualTo(TodoStatus.IN_PROGRESS);
    }

}