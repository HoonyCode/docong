package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Data
public class SaveTeamReqDto {
    @NotNull
    private String userEmail;
    @NotNull
    private String name;

}
