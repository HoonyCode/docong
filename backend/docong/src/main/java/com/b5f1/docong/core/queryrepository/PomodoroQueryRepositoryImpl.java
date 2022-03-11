package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.pomodoro.QPomodoro;
import com.b5f1.docong.core.domain.user.QUser;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class PomodoroQueryRepositoryImpl implements PomodoroQueryRepository {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Pomodoro> findByUser(Long userSeq) {

        return queryFactory
                .selectFrom(QPomodoro.pomodoro)
                .where(QUser.user.seq.eq(userSeq))
                .fetch();
    }
}
