package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.pomodoro.QPomodoro;
import com.b5f1.docong.core.domain.user.QUser;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class PomodoroQueryRepositoryImpl implements PomodoroQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Autowired
    public PomodoroQueryRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
        this.em = em;
    }

    @Override
    public List<Pomodoro> findByUser(Long userSeq) {

        return queryFactory
                .selectFrom(QPomodoro.pomodoro)
                .where(QUser.user.seq.eq(userSeq))
                .fetch();
    }
}
