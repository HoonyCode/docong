package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class UpdateTeamReqDto {
    @NotNull
    private Long teamId;
    @NotNull
    private Long userId;
    @NotNull
    private String name;
}
