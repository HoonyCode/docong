package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindTodoResDto;
import com.b5f1.docong.api.dto.response.FindWorktypeAnalysisResDto;
import com.b5f1.docong.core.domain.todo.Todo;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

import static com.b5f1.docong.core.domain.todo.QTodo.todo;
import static com.b5f1.docong.core.domain.todo.QUserTodo.userTodo;

@Repository
@Transactional
@RequiredArgsConstructor
public class AnalysisQueryRepositoryImpl implements AnalysisQueryRepository{
    private final JPAQueryFactory query;

    @Override
    public List<FindWorktypeAnalysisResDto> findTodosByUserSeq(Long userSeq) {
        return query.select(Projections.constructor(FindWorktypeAnalysisResDto.class,
                    todo.workType,
                    todo.realPomo.sum(),
                    todo.count()
                ))
                .from(todo)
                .join(todo.userTodo, userTodo)
                .where(userTodo.user.seq.eq(userSeq))
                .groupBy(todo.workType)
                .fetch();
    }
}
