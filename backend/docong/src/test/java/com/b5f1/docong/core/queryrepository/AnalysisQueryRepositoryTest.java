package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.dto.response.FindRankingResDto;
import com.b5f1.docong.api.service.PomodoroService;
import com.b5f1.docong.core.domain.pomodoro.TimeStatus;
import com.b5f1.docong.core.domain.pomodoro.noiseStatus;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class AnalysisQueryRepositoryTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PomodoroService pomodoroService;

    @Autowired
    AnalysisQueryRepository analysisQueryRepository;

    @Test
    void findPomoRanking(){
        //given
        User user1 = User.builder()
                .email("wjddma1214@naver.com")
                .name("정음1")
                .password("12345")
                .build();
        User user2 = User.builder()
                .email("wjddma12@naver.com")
                .name("정음2")
                .password("12345")
                .build();
        User user3 = User.builder()
                .email("wjddma@naver.com")
                .name("정음3")
                .password("12345")
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

        //when
        List<FindRankingResDto> response =  analysisQueryRepository.findPomoRanking();

        // then
        assertThat(response.size()).isEqualTo(3);
        assertThat(response.get(0).getUserName()).isEqualTo("정음2");
        assertThat(response.get(0).getPomoCount()).isEqualTo(4);
        assertThat(response.get(1).getUserName()).isEqualTo("정음1");
        assertThat(response.get(1).getPomoCount()).isEqualTo(2);
        assertThat(response.get(2).getUserName()).isEqualTo("정음3");
        assertThat(response.get(2).getPomoCount()).isEqualTo(1);
    }
}