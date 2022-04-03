package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.PomoTimeCountResDto;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.todo.QTodo;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

import static com.b5f1.docong.core.domain.pomodoro.QPomodoro.*;
import static com.b5f1.docong.core.domain.user.QUser.*;

@Repository
@RequiredArgsConstructor
@Transactional
public class PomodoroQueryRepositoryImpl implements PomodoroQueryRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Pomodoro> findByUser(Long userSeq) {

        return queryFactory
                .selectFrom(pomodoro)
                .where(user.seq.eq(userSeq))
                .fetch();
    }

    @Override
    public List<Pomodoro> findDayCountByUserSolo(Long userSeq) {
        return queryFactory
                .select(pomodoro)
                .from(pomodoro)
                .leftJoin(QTodo.todo)
                .on(pomodoro.todo.eq(QTodo.todo))
                .where(pomodoro.user.seq.eq(userSeq)
                        .and(pomodoro.startTime.between(LocalDateTime.now().minusMonths(1), LocalDateTime.now()))
                        .and(QTodo.todo.team.isNull()))
                .fetch();
    }

    @Override
    public List<Pomodoro> findDayCountByUserGroup(Long userSeq, Long groupSeq) {
        return queryFactory
                .select(pomodoro)
                .from(pomodoro)
                .leftJoin(QTodo.todo)
                .on(pomodoro.todo.eq(QTodo.todo))
                .where(pomodoro.user.seq.eq(userSeq)
                        .and(pomodoro.startTime.between(LocalDateTime.now().minusMonths(1), LocalDateTime.now()))
                        .and(QTodo.todo.team.seq.eq(groupSeq)))
                .fetch();
    }

    @Override
    public List<PomoTimeCountResDto> findTimeCountByUserSolo(Long userSeq) {
        return queryFactory
                .select(Projections.constructor(PomoTimeCountResDto.class,
                        pomodoro.startTime.hour(),
                        pomodoro.startTime.count()
                ))
                .from(pomodoro)
                .leftJoin(QTodo.todo)
                .on(pomodoro.todo.eq(QTodo.todo))
                .where(pomodoro.user.seq.eq(userSeq)
                        .and(QTodo.todo.team.isNull()))
                .groupBy(pomodoro.startTime.hour())
                .fetch();
    }

    @Override
    public List<PomoTimeCountResDto> findTimeCountByUserGroup(Long userSeq, Long groupSeq) {
        return queryFactory
                .select(Projections.constructor(PomoTimeCountResDto.class,
                        pomodoro.startTime.hour(),
                        pomodoro.startTime.count()
                ))
                .from(pomodoro)
                .leftJoin(QTodo.todo)
                .on(pomodoro.todo.eq(QTodo.todo))
                .where(pomodoro.user.seq.eq(userSeq)
                        .and(QTodo.todo.team.seq.eq(groupSeq)))
                .groupBy(pomodoro.startTime.hour())
                .fetch();
    }

}
