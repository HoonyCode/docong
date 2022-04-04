package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindMemberActivateResDto;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.b5f1.docong.core.domain.group.QTeamUser.teamUser;
import static com.b5f1.docong.core.domain.user.QUser.user;

@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamUserQueryRepositoryImpl implements TeamUserQueryRepository {

    private final JPAQueryFactory query;

    @Override
    public List<TeamUser> findTeamUserWithTeamId(Long teamSeq) {
        return query
                .select(teamUser)
                .from(teamUser)
                .where(teamUser.team.seq.eq(teamSeq))
                .fetch();
    }

    @Override
    public List<TeamUser> findTeamUserWithUserId(Long userSeq) {
        return query
                .select(teamUser)
                .from(teamUser)
                .where(teamUser.user.seq.eq(userSeq))
                .fetch();
    }

    @Override
    public Optional<TeamUser> findTeamUserWithUserIdAndTeamId(Long userSeq, Long teamSeq) {
        return Optional.ofNullable(query
                .selectFrom(teamUser)
                .where(teamUser.user.seq.eq(userSeq),teamUser.team.seq.eq(teamSeq))
                .fetchOne());
    }

    @Override
    public List<FindMemberActivateResDto> findMemberActivate(Long teamSeq) {
        return query
                .select(Projections.constructor(FindMemberActivateResDto.class,
                        user.email,
                        user.image,
                        user.name,
                        user.online
                ))
                .from(teamUser)
                .innerJoin(teamUser.user, user)
                .where(teamUser.team.seq.eq(teamSeq))
                .fetch();
    }


}
