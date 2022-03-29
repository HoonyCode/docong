package com.b5f1.docong.api.dto.response;

import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FindTeamResDto {
    private Team team;
    private List<User> userList;
    private User leader;
}
