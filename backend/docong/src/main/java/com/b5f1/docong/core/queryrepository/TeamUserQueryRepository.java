package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.core.domain.group.TeamUser;

import java.util.List;

public interface TeamUserQueryRepository {
    List<TeamUser> findTeamUserWithTeamId(Long teamSeq);
    List<TeamUser> findTeamUserWithUserId(Long userSeq);
}
