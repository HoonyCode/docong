package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.user.User;

import javax.persistence.EntityManager;
import java.util.List;

public interface PomodoroService {


    Long savePomodoro(SavePomodoroReqDto reqDto, User user);


    List<Pomodoro> findAll(Long user_seq);
}
