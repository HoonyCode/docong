package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.ModifyTodoStatusReqDto;
import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.response.FindTodoResDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.TodoStatus;
import com.b5f1.docong.core.domain.todo.UserTodo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import com.b5f1.docong.core.repository.UserTodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void before() {
        createUser();
    }

    private User savedUser;
    private Todo savedTodo;

    @Test
    public void testFindTodo() throws Exception{
        //given
        createTodo();

        //when
        FindTodoResDto resDto = todoService.findTodo(savedTodo.getSeq());

        //then
        assertThat(resDto.getTitle()).isEqualTo("제목");
        assertThat(resDto.getContent()).isEqualTo("내용");
    }

    @Test
    public void testFindUserTodos() throws Exception{
        //given
        createTodo();

        //when
        List<FindTodoResDto> resDto = todoService.findUserTodos(savedUser.getSeq());

        //then
        assertThat(resDto.size()).isEqualTo(1);
        assertThat(resDto.get(0).getTitle()).isEqualTo("제목");
        assertThat(resDto.get(0).getContent()).isEqualTo("내용");
    }

    @Test
    void testSaveTodo() {
        // given
        User user = userRepository.findByEmailAndActivateTrue("wjddma1214@naver.com");
        SaveTodoReqDto reqDto = new SaveTodoReqDto("제목", "내용", null, user.getSeq(), null, null, null);

        // when
        Long todoSeq = todoService.saveTodo(reqDto);

        // then
        Todo findTodo = todoRepository.findById(todoSeq)
                .orElseThrow(() -> new IllegalStateException("없는 Todo입니다"));

        assertThat(findTodo.getTitle()).isEqualTo("제목");
        assertThat(findTodo.getStatus()).isEqualTo(TodoStatus.TODO);
        assertThat(findTodo.getUserTodos().size()).isEqualTo(1);
        assertThat(findTodo.getUserTodos().get(0).getTodo()).isEqualTo(findTodo);
        assertThat(findTodo.getUserTodos().get(0).getUser()).isEqualTo(user);
    }

    @Test
    void testDeleteTodo() {
        // given
        Todo todo = Todo.builder()
                .title("제목")
                .content("내용")
                .build();
        UserTodo userTodo = UserTodo
                .builder()
                .build();
        todo.addUserTodo(userTodo);

        Todo savedTodo = todoRepository.save(todo);
        UserTodo savedUserTodo = savedTodo.getUserTodos().get(0);

        // when
        todoService.deleteTodo(savedTodo.getSeq());

        // then
        assertThatThrownBy(() -> {
            todoRepository.findById(savedTodo.getSeq())
                    .orElseThrow(() -> new IllegalStateException());
        }).isInstanceOf(IllegalStateException.class);
        assertThatThrownBy(() -> {
            userTodoRepository.findById(savedUserTodo.getSeq())
                    .orElseThrow(() -> new IllegalStateException());
        }).isInstanceOf(IllegalStateException.class);
    }

    @Test
    void testModifyTodo() {
        // given
        User user = userRepository.findByEmailAndActivateTrue("wjddma1214@naver.com");
        Todo todo = Todo.builder()
                .title("제목")
                .content("내용")
                .build();
        Todo savedTodo = todoRepository.save(todo);
        SaveTodoReqDto reqDto = new SaveTodoReqDto("제목수정", "내용수정", null, user.getSeq(), null, null, null);

        // when
        todoService.modifyTodo(savedTodo.getSeq(), reqDto);

        // then
        Todo findTodo = todoRepository.findById(savedTodo.getSeq())
                .orElseThrow(() -> new IllegalStateException("없는 Todo입니다"));
        assertThat(findTodo.getTitle()).isEqualTo("제목수정");
        assertThat(findTodo.getContent()).isEqualTo("내용수정");
    }

    @Test
    void testModifyStatus() {
        // given
        Todo todo = Todo.builder()
                .title("제목")
                .content("내용")
                .status(TodoStatus.TODO)
                .build();
        Todo savedTodo = todoRepository.save(todo);
        ModifyTodoStatusReqDto reqDto = new ModifyTodoStatusReqDto(TodoStatus.IN_PROGRESS);

        // when
        todoService.modifyStatus(savedTodo.getSeq(), reqDto);

        // then
        Todo findTodo = todoRepository.findById(savedTodo.getSeq()).orElseThrow(() -> new IllegalStateException("없는 Todo입니다"));
        assertThat(findTodo.getStatus()).isEqualTo(TodoStatus.IN_PROGRESS);
    }

    private void createUser() {
        User user = User.builder()
                .email("wjddma1214@naver.com")
                .password("12345")
                .activate(true)
                .build();
        savedUser = userRepository.save(user);
    }

    private void createTodo(){
        User user = userRepository.findByEmailAndActivateTrue("wjddma1214@naver.com");

        SaveTodoReqDto reqDto = new SaveTodoReqDto("제목", "내용", null, user.getSeq(), null, null, null);
        Todo todo = reqDto.toEntity();
        UserTodo userTodo = UserTodo.builder()
                .build();

        todo.addUserTodo(userTodo);
        user.addUserTodo(userTodo);

        savedTodo = todoRepository.save(todo);
    }
}