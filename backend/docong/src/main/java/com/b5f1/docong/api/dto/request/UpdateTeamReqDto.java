package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateTeamReqDto {
    private Long teamId;
    private Long userId;
    private String name;
}
