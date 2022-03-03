package com.b5f1.docong.core.repository;

import com.b5f1.docong.core.domain.todo.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TodoRepositoryTest {
    @Autowired
    private TodoRepository todoRepository;

    @Test
    void testCreateTodo() {
        // given
        Todo todo = Todo.builder()
                .name("할일")
                .content("내용")
                .predictedPomo(1)
                .realPomo(1)
                .status(TodoStatus.TODO)
                .workImportance(WorkImportance.LOWER)
                .workProficiency(WorkProficiency.ADVANCED)
                .build();

        // when
        Todo savedTodo = todoRepository.save(todo);

        // then
        assertThat(savedTodo.getName()).isEqualTo("할일");
        assertThat(savedTodo.getContent()).isEqualTo("내용");
        assertThat(savedTodo.getPredictedPomo()).isEqualTo(1);
        assertThat(savedTodo.getRealPomo()).isEqualTo(1);
        assertThat(savedTodo.getStatus()).isEqualTo(TodoStatus.TODO);
        assertThat(savedTodo.getWorkImportance()).isEqualTo(WorkImportance.LOWER);
        assertThat(savedTodo.getWorkProficiency()).isEqualTo(WorkProficiency.ADVANCED);
    }

    @Test
    void testFindTodo() {
        // given
        Todo todo = Todo.builder()
                .name("할일")
                .content("내용")
                .predictedPomo(1)
                .realPomo(1)
                .status(TodoStatus.TODO)
                .workImportance(WorkImportance.LOWER)
                .workProficiency(WorkProficiency.ADVANCED)
                .build();
        Todo savedTodo = todoRepository.save(todo);

        // when
        Todo findTodo = todoRepository.findById(savedTodo.getSeq()).orElseThrow(()->new IllegalStateException("없는 todo입니다."));

        // then
        assertThat(findTodo.getName()).isEqualTo("할일");
        assertThat(findTodo.getContent()).isEqualTo("내용");
        assertThat(findTodo.getPredictedPomo()).isEqualTo(1);
        assertThat(findTodo.getRealPomo()).isEqualTo(1);
        assertThat(findTodo.getStatus()).isEqualTo(TodoStatus.TODO);
        assertThat(findTodo.getWorkImportance()).isEqualTo(WorkImportance.LOWER);
        assertThat(findTodo.getWorkProficiency()).isEqualTo(WorkProficiency.ADVANCED);
    }

    @Test
    void testDeleteTodo() {
        // given
        Todo todo = Todo.builder()
                .name("할일")
                .content("내용")
                .predictedPomo(1)
                .realPomo(1)
                .status(TodoStatus.TODO)
                .workImportance(WorkImportance.LOWER)
                .workProficiency(WorkProficiency.ADVANCED)
                .build();

        Todo savedTodo = todoRepository.save(todo);

        // when
        todoRepository.delete(savedTodo);

        // then
        assertThatThrownBy(()-> {
            todoRepository.findById(savedTodo.getSeq()).orElseThrow(() -> new IllegalStateException("없는 todo 입니다."));
        }).isInstanceOf(IllegalStateException.class).hasMessage("없는 todo 입니다.");
    }


}