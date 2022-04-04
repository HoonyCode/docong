package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindMemberActivateResDto;
import com.b5f1.docong.core.domain.group.TeamUser;

import java.util.List;
import java.util.Optional;

public interface TeamUserQueryRepository {
    List<TeamUser> findTeamUserWithTeamId(Long teamSeq);
    List<TeamUser> findTeamUserWithUserId(Long userSeq);
    Optional<TeamUser> findTeamUserWithUserIdAndTeamId(Long userSeq, Long teamSeq);
}
