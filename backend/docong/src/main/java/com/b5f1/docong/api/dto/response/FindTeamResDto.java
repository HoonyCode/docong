package com.b5f1.docong.api.dto.response;

import com.b5f1.docong.core.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FindTeamResDto {
    private Long teamId;
    private List<User> userList;
    private String name;
    private User leader;
}
