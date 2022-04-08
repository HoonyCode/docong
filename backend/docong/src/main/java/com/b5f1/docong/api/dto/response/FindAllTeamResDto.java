package com.b5f1.docong.api.dto.response;

import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindAllTeamResDto {
    private Team team;
    private Long leader;
    private List<User> userList;

}
