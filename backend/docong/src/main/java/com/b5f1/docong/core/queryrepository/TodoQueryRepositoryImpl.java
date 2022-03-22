package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindTodoResDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.b5f1.docong.core.domain.todo.QTodo.todo;
import static com.b5f1.docong.core.domain.todo.QUserTodo.userTodo;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoQueryRepositoryImpl implements TodoQueryRepository{

    private final JPAQueryFactory query;

    @Override
    public List<FindTodoResDto> findAllWithUserId(Long userSeq) {
        return query
                .select(Projections.constructor(FindTodoResDto.class,
                        todo.seq,
                        todo.title,
                        todo.content,
                        todo.status,
                        todo.predictedPomo,
                        todo.realPomo,
                        todo.workProficiency,
                        todo.workType,
                        todo.workImportance,
                        todo.userTodo.user.email))
                .from(todo)
                .innerJoin(todo.userTodo, userTodo)
                .where(userTodo.user.seq.eq(userSeq)
                        .and(todo.team.isNull()))
                .fetch();
    }

    @Override
    public List<FindTodoResDto> findAllWithGroupId(Long groupSeq) {
        return query
                .select(Projections.constructor(FindTodoResDto.class,
                        todo.seq,
                        todo.title,
                        todo.content,
                        todo.status,
                        todo.predictedPomo,
                        todo.realPomo,
                        todo.workProficiency,
                        todo.workType,
                        todo.workImportance,
                        todo.userTodo.user.email))
                .from(todo)
                .where(todo.team.seq.eq(groupSeq))
                .fetch();
    }
}
