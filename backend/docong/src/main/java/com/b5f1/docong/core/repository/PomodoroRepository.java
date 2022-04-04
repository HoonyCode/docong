package com.b5f1.docong.core.repository;

import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.queryrepository.PomodoroQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PomodoroRepository extends JpaRepository<Pomodoro, Long>, PomodoroQueryRepository {
}