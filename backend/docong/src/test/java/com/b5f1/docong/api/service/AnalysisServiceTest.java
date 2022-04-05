package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.response.FindAllDateCountResDto;
import com.b5f1.docong.api.dto.response.FindRankingResDto;
import com.b5f1.docong.api.dto.response.FindWorktypeAnalysisResDto;
import com.b5f1.docong.api.dto.response.PomoTimeCountResDto;
import com.b5f1.docong.core.domain.pomodoro.TimeStatus;
import com.b5f1.docong.core.domain.pomodoro.noiseStatus;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.UserTodo;
import com.b5f1.docong.core.domain.todo.WorkType;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional
class AnalysisServiceTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PomodoroService pomodoroService;

    @Autowired
    TodoRepository todoRepository;

    @Autowired
    AnalysisService analysisService;

    @Test
    void findPomoRanking() {
        //given
        User user1 = User.builder()
                .email("wjddma1214@naver.com")
                .name("정음1")
                .password("12345")
                .activate(true)
                .build();
        User user2 = User.builder()
                .email("wjddma12@naver.com")
                .name("정음2")
                .password("12345")
                .activate(true)
                .build();
        User user3 = User.builder()
                .email("wjddma@naver.com")
                .name("정음3")
                .password("12345")
                .activate(true)
                .build();
        User savedUser1 = userRepository.save(user1);
        User savedUser2 = userRepository.save(user2);
        User savedUser3 = userRepository.save(user3);

        SavePomodoroReqDto savePomodoroReqDto = new SavePomodoroReqDto(null, TimeStatus.BASIC, null, null, 0, noiseStatus.NOISE);
        pomodoroService.savePomodoro(savePomodoroReqDto, savedUser2);
        pomodoroService.savePomodoro(savePomodoroReqDto, savedUser2);
        pomodoroService.savePomodoro(savePomodoroReqDto, savedUser2);
        pomodoroService.savePomodoro(savePomodoroReqDto, savedUser2);
        pomodoroService.savePomodoro(savePomodoroReqDto, savedUser1);
        pomodoroService.savePomodoro(savePomodoroReqDto, savedUser1);
        pomodoroService.savePomodoro(savePomodoroReqDto, savedUser3);

        // when
        List<FindRankingResDto> response = analysisService.findPomoRanking();

        // then
        assertThat(response.size()).isEqualTo(3);
        assertThat(response.get(0).getUserName()).isEqualTo("정음2");
        assertThat(response.get(0).getPomoCount()).isEqualTo(8);
        assertThat(response.get(1).getUserName()).isEqualTo("정음1");
        assertThat(response.get(1).getPomoCount()).isEqualTo(4);
        assertThat(response.get(2).getUserName()).isEqualTo("정음3");
    }

    @Test
    void findWorktypeAnalysis() {
        //given
        User user = User.builder()
                .email("wjddma1214@naver.com")
                .name("정음1")
                .password("12345")
                .activate(true)
                .build();
        User savedUser = userRepository.save(user);
        Todo todo = Todo.builder()
                .realPomo(2)
                .workType(WorkType.개발)
                .build();

        Todo todo1 = Todo.builder()
                .realPomo(5)
                .workType(WorkType.개발)
                .build();

        Todo todo2 = Todo.builder()
                .realPomo(1)
                .workType(WorkType.관리)
                .build();

        UserTodo userTodo = UserTodo.builder()
                .user(savedUser)
                .todo(todo)
                .build();

        UserTodo userTodo1 = UserTodo.builder()
                .user(savedUser)
                .todo(todo1)
                .build();

        UserTodo userTodo2 = UserTodo.builder()
                .user(savedUser)
                .todo(todo2)
                .build();

        todo.addUserTodo(userTodo);
        todo1.addUserTodo(userTodo1);
        todo2.addUserTodo(userTodo2);

        todoRepository.save(todo);
        todoRepository.save(todo1);
        todoRepository.save(todo2);

        // when
        List<FindWorktypeAnalysisResDto> response = analysisService.findWorktypeAnalysis(savedUser);


        // then
        assertThat(response.size()).isEqualTo(2);
        assertThat(response.get(0).getWorkType()).isEqualTo(WorkType.개발);
        assertThat(response.get(0).getCountTodo()).isEqualTo(2);
        assertThat(response.get(0).getTotalPomo()).isEqualTo(7);
    }


    @Test
    void 년도로뽀모가져오기() {
        List<FindAllDateCountResDto> result = analysisService.findAllDateCountByUser(70L, 2022);

//        for (FindAllDateCountResDto resDto : result) {
//            System.out.println(resDto);
//        }

        Assertions.assertThat(result.get(result.size() - 1).getCount().equals(0));
    }


//    @Test
//    void 시간별로뽀모가져오기(){
//        List<PomoTimeCountResDto> result = analysisService.findTimeCountByUserSolo(70L);
//
//    }
}