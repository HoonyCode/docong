package com.b5f1.docong.api.service;

import ch.qos.logback.core.spi.LogbackLock;
import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.request.UserInfoReqDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.pomodoro.Emotion;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.pomodoro.TimeStatus;
import com.b5f1.docong.core.domain.pomodoro.noiseStatus;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.UserTodo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.PomodoroRepository;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class PomodoroServiceImplTest {
    @Autowired
    private PomodoroService pomodoroService;

    @Autowired
    private PomodoroRepository pomodoroRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TodoRepository todoRepository;

    private User savedUser;
    private Todo savedTodo;

    @Autowired
    EntityManager em;

    @BeforeEach
    void before() {
        createUser();
        createTodo();
    }

    @Test
    void 뽀모도로저장하기() {
        //given
        SavePomodoroReqDto savePomodoroReqDto = new SavePomodoroReqDto(savedTodo.getSeq(), TimeStatus.BASIC, null, null, 0, noiseStatus.NOISE);

        //when
        Long saveSeq = pomodoroService.savePomodoro(savePomodoroReqDto, savedUser);
        Optional<Pomodoro> save = pomodoroRepository.findById(saveSeq);

        //then
        assertThat(save.get().getSeq()).isEqualTo(saveSeq);
        assertThat(savedTodo.getRealPomo()).isEqualTo(2);

    }

    @Test
    void 뽀모도로저장하기_TODONULL(){
        //given
        SavePomodoroReqDto savePomodoroReqDto = new SavePomodoroReqDto(null, TimeStatus.BASIC, null, null, 0, noiseStatus.NOISE);

        //when
        Long saveSeq = pomodoroService.savePomodoro(savePomodoroReqDto, savedUser);
        Optional<Pomodoro> pomo = pomodoroRepository.findById(saveSeq);

        //then
        assertThat(pomo.get().getSeq()).isEqualTo(saveSeq);
    }

    @Test
    void 유저아이디로뽀모도로리스트찾기() {
        //given
        Long seq = pomodoroService.savePomodoro(new SavePomodoroReqDto(savedTodo.getSeq(), TimeStatus.BASIC, null, null, 0, noiseStatus.NOISE), savedUser);

        //when
        List<Pomodoro> findByUser = pomodoroService.findAll(savedUser.getSeq());

        System.out.println("findByUser = " + findByUser);

        //then
        assertThat(findByUser.get(0).getSeq()).isEqualTo(seq);

    }

    private void createUser() {
        User user = User.builder()
                .email("wjddma1214@naver.com")
                .password("12345")
                .build();
        savedUser = userRepository.save(user);
    }

    private void createTodo() {

        SaveTodoReqDto reqDto = new SaveTodoReqDto("제목", "내용", null, savedUser.getEmail(), null, null, null, 4);
        Todo todo = reqDto.toEntity();
        UserTodo userTodo = UserTodo.builder()
                .build();

        todo.addUserTodo(userTodo);
        savedUser.addUserTodo(userTodo);

        savedTodo = todoRepository.save(todo);
    }


}