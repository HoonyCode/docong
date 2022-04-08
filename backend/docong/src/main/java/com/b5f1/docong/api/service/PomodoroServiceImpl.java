package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SavePomodoroReqDto;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.user.Tier;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.queryrepository.AnalysisQueryRepository;
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
    final private AnalysisQueryRepository analysisQueryRepository;

    @Override
    public Long savePomodoro(SavePomodoroReqDto reqDto, User user) {

        Todo todo = null;
        if (reqDto.getTodo_seq() != null) {
            todo = todoRepository.findById(reqDto.getTodo_seq()).orElseThrow(() -> {
                throw new CustomException(ErrorCode.TODO_NOT_FOUND);
            });
            todo.addRealPomo(reqDto.getTimeStatus());
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

        pomodoro.addUserPomodoro(user);

        checkTier(user);

        return pomodoroRepository.save(pomodoro).getSeq();
    }

    @Override
    public List<Pomodoro> findAll(Long user_seq) {
        return pomodoroRepository.findByUser(user_seq);
    }

    private void checkTier(User user) {
        Integer realPomo = user.getRealPomo();
        if(0<=realPomo&&realPomo<50) user.changeTier(Tier.한콩);
        else if(50<=realPomo&&realPomo<100) user.changeTier(Tier.두콩);
        else if(100<=realPomo&&realPomo<200) user.changeTier(Tier.세콩);
        else if(200<=realPomo&&realPomo<500) user.changeTier(Tier.네콩);
        else if(500<=realPomo&&realPomo<1000) user.changeTier(Tier.완두콩);
        else if(1000<=realPomo&&realPomo<5000) user.changeTier(Tier.투두콩);
        else if(5000<=realPomo&&realPomo<10000) user.changeTier(Tier.쓰리두콩);
        else if(10000<=realPomo&&realPomo<20000) user.changeTier(Tier.포두콩);
        else if(200<=realPomo) user.changeTier(Tier.콩나무);
    }
}
