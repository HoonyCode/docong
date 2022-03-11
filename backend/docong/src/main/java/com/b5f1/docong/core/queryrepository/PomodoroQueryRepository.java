package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PomodoroQueryRepository {
    List<Pomodoro> findByUser(Long userSeq);
}
