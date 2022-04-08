package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaveAndDeleteTeamUserReqDto {
    @NotNull
    private Long teamId;
    @NotNull
    private String userEmail;
//    @NotNull
//    private Long reqUserId;

}
