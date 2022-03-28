package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindRankingResDto;
import com.b5f1.docong.api.dto.response.FindTodoResDto;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

import static com.b5f1.docong.core.domain.pomodoro.QPomodoro.pomodoro;
import static com.b5f1.docong.core.domain.todo.QTodo.todo;
import static com.b5f1.docong.core.domain.todo.QUserTodo.userTodo;
import static com.b5f1.docong.core.domain.user.QUser.user;

@Repository
@RequiredArgsConstructor
@Transactional
public class AnalysisQueryRepositoryImpl implements AnalysisQueryRepository{

    private final JPAQueryFactory query;

    @Override
    public List<FindRankingResDto> findPomoRanking() {
        StringPath aliasCount = Expressions.stringPath("count");
        return query
                .select(Projections.constructor(FindRankingResDto.class,
                    user.name,
                    user.birth,
                    user.pomodoros.size()
                ))
                .from(user)
                .orderBy(sortByCount())
                .limit(20)
                .fetch();
    }

    private OrderSpecifier<?> sortByCount() {
        return new OrderSpecifier<>(Order.DESC, user.pomodoros.size());
    }
}
