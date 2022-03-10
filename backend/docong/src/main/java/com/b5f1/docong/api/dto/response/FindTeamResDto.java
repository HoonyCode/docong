package com.b5f1.docong.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FindTeamResDto {
    private Long teamId;
    private List<Long> userList;
    private String name;
    private Long leader;
}
