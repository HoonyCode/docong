package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.PomodoroRepository;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManagerFactory;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PomodoroServiceImpl implements PomodoroService {
    final private PomodoroRepository pomodoroRepository;
    final private TodoRepository todoRepository;


    @Override
    public Long savePomodoro(SavePomodoroReqDto reqDto, User user) {

        Todo todo = null;
        if (reqDto.getTodo_seq() != null) {
            todo = todoRepository.findById(reqDto.getTodo_seq()).orElseThrow(() -> {
                throw new CustomException(ErrorCode.TODO_NOT_FOUND);
            });
            todo.addRealPomo();
        }

        Pomodoro pomodoro = Pomodoro.builder()
                .user(user)
                .todo(todo)
                .otherTime(reqDto.getOtherTime())
                .noise(reqDto.getNoise())
                .startTime(reqDto.getStartTime())
                .endTime(reqDto.getEndTime())
                .timeStatus(reqDto.getTimeStatus())
                .build();


        return pomodoroRepository.save(pomodoro).getSeq();
    }

    @Override
    public List<Pomodoro> findAll(Long user_seq) {
        return pomodoroRepository.findByUser(user_seq);
    }
}
