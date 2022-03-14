package com.b5f1.docong.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class FindAllTeamResDto {
    private Map<Long,String> teams;
}
