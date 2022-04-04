package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.response.FindGroupRankingResDto;
import com.b5f1.docong.api.dto.response.FindPomoTimeResDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.pomodoro.TimeStatus;
import com.b5f1.docong.core.domain.pomodoro.noiseStatus;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import com.b5f1.docong.core.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class AnalysisGroupServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamUserRepository teamUserRepository;

    @Autowired
    private PomodoroService pomodoroService;

    @Autowired
    private TodoService todoService;

    @Autowired
    private AnalysisService analysisService;

    @BeforeEach
    void before() {
        createUser();
        createTeam();
        createTeamUser();
    }

    private Team savedTeam1;
    private Team savedTeam2;

    private User savedUser1;
    private User savedUser2;
    private User savedUser3;

    @Test
    public void findPomoTimeTest() throws Exception {
        // 개인 뽀모 : 2
        SavePomodoroReqDto savePomodoroReqDto = new SavePomodoroReqDto(null, TimeStatus.BASIC, null, null, 0, noiseStatus.NOISE);
        pomodoroService.savePomodoro(savePomodoroReqDto, savedUser1);

        // 그룹 뽀로 : 팀1 - 4, 팀2 - 3
        SaveTodoReqDto saveTodoReqDto1 = new SaveTodoReqDto("제목", "내용", savedTeam1.getSeq(), savedUser1.getEmail(), null, null, null, 4);
        SaveTodoReqDto saveTodoReqDto2 = new SaveTodoReqDto("제목", "내용", savedTeam2.getSeq(), savedUser1.getEmail(), null, null, null, 1);
        SaveTodoReqDto saveTodoReqDto3 = new SaveTodoReqDto("제목", "내용", savedTeam2.getSeq(), savedUser1.getEmail(), null, null, null, 2);
        Long todoSeq1 = todoService.saveTodo(saveTodoReqDto1);
        Long todoSeq2 = todoService.saveTodo(saveTodoReqDto2);
        Long todoSeq3 = todoService.saveTodo(saveTodoReqDto3);

        SavePomodoroReqDto savePomodoroReqDto1 = new SavePomodoroReqDto(todoSeq1, TimeStatus.LONG, null, null, 0, noiseStatus.NOISE);
        SavePomodoroReqDto savePomodoroReqDto2 = new SavePomodoroReqDto(todoSeq2, TimeStatus.SHORT, null, null, 0, noiseStatus.NOISE);
        SavePomodoroReqDto savePomodoroReqDto3 = new SavePomodoroReqDto(todoSeq3, TimeStatus.BASIC, null, null, 0, noiseStatus.NOISE);
        pomodoroService.savePomodoro(savePomodoroReqDto1, savedUser1);
        pomodoroService.savePomodoro(savePomodoroReqDto2, savedUser1);
        pomodoroService.savePomodoro(savePomodoroReqDto3, savedUser1);

        FindPomoTimeResDto response = analysisService.findPomoTime(savedUser1.getSeq());

        assertThat(response.getSinglePomoCount()).isEqualTo(2);
        assertThat(response.getTotalPomoCount()).isEqualTo(9);
    }

    @Test
    public void findGroupRankingTest() throws Exception {
        // 유저1 - 1, 유저2 - 2, 유저3 - 4
        SaveTodoReqDto saveTodoReqDto1 = new SaveTodoReqDto("제목", "내용", savedTeam1.getSeq(), savedUser1.getEmail(), null, null, null, 1);
        SaveTodoReqDto saveTodoReqDto2 = new SaveTodoReqDto("제목", "내용", savedTeam1.getSeq(), savedUser2.getEmail(), null, null, null, 2);
        SaveTodoReqDto saveTodoReqDto3 = new SaveTodoReqDto("제목", "내용", savedTeam1.getSeq(), savedUser3.getEmail(), null, null, null, 4);
        Long todoSeq1 = todoService.saveTodo(saveTodoReqDto1);
        Long todoSeq2 = todoService.saveTodo(saveTodoReqDto2);
        Long todoSeq3 = todoService.saveTodo(saveTodoReqDto3);

        SavePomodoroReqDto savePomodoroReqDto1 = new SavePomodoroReqDto(todoSeq1, TimeStatus.SHORT, null, null, 0, noiseStatus.NOISE);
        SavePomodoroReqDto savePomodoroReqDto2 = new SavePomodoroReqDto(todoSeq2, TimeStatus.BASIC, null, null, 0, noiseStatus.NOISE);
        SavePomodoroReqDto savePomodoroReqDto3 = new SavePomodoroReqDto(todoSeq3, TimeStatus.LONG, null, null, 0, noiseStatus.NOISE);
        pomodoroService.savePomodoro(savePomodoroReqDto1, savedUser1);
        pomodoroService.savePomodoro(savePomodoroReqDto2, savedUser2);
        pomodoroService.savePomodoro(savePomodoroReqDto3, savedUser3);

        List<FindGroupRankingResDto> response = analysisService.findGroupRanking(savedTeam1.getSeq());

        assertThat(response.size()).isEqualTo(3);
        assertThat(response.get(0).getUserName()).isEqualTo("현서3");
        assertThat(response.get(0).getPomoCount()).isEqualTo(4);
        assertThat(response.get(1).getUserName()).isEqualTo("현서2");
        assertThat(response.get(1).getPomoCount()).isEqualTo(2);
        assertThat(response.get(2).getUserName()).isEqualTo("현서1");
        assertThat(response.get(2).getPomoCount()).isEqualTo(1);
    }

    private void createUser() {
        User user1 = User.builder()
                .email("gustj1@docong.com")
                .name("현서1")
                .password("1234")
                .activate(true)
                .build();
        User user2 = User.builder()
                .email("gustj2@docong.com")
                .name("현서2")
                .password("1234")
                .activate(true)
                .build();
        User user3 = User.builder()
                .email("gustj3@docong.com")
                .name("현서3")
                .password("1234")
                .activate(true)
                .build();
        savedUser1 = userRepository.save(user1);
        savedUser2 = userRepository.save(user2);
        savedUser3 = userRepository.save(user3);
    }

    private void createTeam() {
        Team team1 = Team.builder()
                .name("Team1")
                .build();
        Team team2 = Team.builder()
                .name("Team2")
                .build();
        savedTeam1 = teamRepository.save(team1);
        savedTeam2 = teamRepository.save(team2);
    }

    private void createTeamUser() {
        // 팀1 멤버 : 유저1, 유저2, 유저3
        TeamUser teamUser1 = TeamUser.builder()
                .team(savedTeam1)
                .user(savedUser1)
                .leader(false)
                .build();
        TeamUser teamUser2 = TeamUser.builder()
                .team(savedTeam1)
                .user(savedUser2)
                .leader(false)
                .build();
        TeamUser teamUser3 = TeamUser.builder()
                .team(savedTeam1)
                .user(savedUser3)
                .leader(false)
                .build();
        teamUserRepository.save(teamUser1);
        teamUserRepository.save(teamUser2);
        teamUserRepository.save(teamUser3);

        // 팀2 멤버 : 유저 1
        TeamUser teamUser4 = TeamUser.builder()
                .team(savedTeam2)
                .user(savedUser1)
                .leader(false)
                .build();
        teamUserRepository.save(teamUser4);
    }
}
