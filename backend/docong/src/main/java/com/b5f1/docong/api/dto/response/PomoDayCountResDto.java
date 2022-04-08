package com.b5f1.docong.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PomoDayCountResDto {
    Long day;
    Long week;
    Long month;
}
