package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindAllDateCountResDto;
import com.b5f1.docong.api.dto.response.PomoTimeCountResDto;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PomodoroQueryRepository {
    List<Pomodoro> findByUser(Long userSeq);

    List<Pomodoro> findDayCountByUserSolo(Long userSeq);

    List<Pomodoro> findDayCountByUserGroup(Long userSeq, Long groupSeq);

    List<PomoTimeCountResDto> findTimeCountByUser(Long userSeq);

    List<PomoTimeCountResDto> findTimeCountByUserGroup(Long userSeq, Long groupSeq);

    List<FindAllDateCountResDto> findAllDateByUser(Long userSeq, int year);

    List<FindAllDateCountResDto> findAllDateByGroup(Long groupSeq, int year);

}
