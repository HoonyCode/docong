package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindAllDateCountResDto;
import com.b5f1.docong.api.dto.response.PomoTimeCountResDto;
import com.b5f1.docong.api.dto.response.QFindAllDateCountResDto;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.todo.QTodo;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
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

    @Override
    public List<FindAllDateCountResDto> findAllDateByUser(Long userSeq, int year) {

        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})"
                , pomodoro.startTime
                , ConstantImpl.create("%Y-%m-%d"));

        return queryFactory
                .select(new QFindAllDateCountResDto(
                        formattedDate,
                        pomodoro.count()))
                .from(pomodoro)
                .where(pomodoro.user.seq.eq(userSeq).and(pomodoro.startTime.year().eq(year)))
                .groupBy(formattedDate)
                .fetch();
    }

    @Override
    public List<FindAllDateCountResDto> findAllDateByGroup(Long groupSeq, int year) {

        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})"
                , pomodoro.startTime
                , ConstantImpl.create("%Y-%m-%d"));

        return queryFactory
                .select(new QFindAllDateCountResDto(
                        formattedDate,
                        pomodoro.count()))
                .from(pomodoro)
                .leftJoin(QTodo.todo)
                .on(pomodoro.todo.eq(QTodo.todo))
                .where(QTodo.todo.team.seq.eq(groupSeq).and(pomodoro.startTime.year().eq(year)))
                .groupBy(formattedDate)
                .fetch();
    }
}
