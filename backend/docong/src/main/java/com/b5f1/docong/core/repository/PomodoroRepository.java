package com.b5f1.docong.core.repository;

import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroRepository extends JpaRepository<Pomodoro, Long> {
}
