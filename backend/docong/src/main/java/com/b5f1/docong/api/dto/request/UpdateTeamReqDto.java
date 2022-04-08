package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTeamReqDto {
    @NotNull
    private Long teamId;
    @NotNull
    private String userEmail;
    @NotNull
    private String name;
}
