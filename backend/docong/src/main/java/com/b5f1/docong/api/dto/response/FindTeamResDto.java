package com.b5f1.docong.api.dto.response;

import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Column;
import java.util.List;

@Data
@AllArgsConstructor
public class FindTeamResDto {
    private Long teamSeq;
    private String name;
    private String jiraDomain;
    private String jiraUserId;
    private String jiraAPIToken;
    private String jiraProjectKey;
    private List<UserSimpleInfoResDto> userList;
    private Long leaderSeq;
}
