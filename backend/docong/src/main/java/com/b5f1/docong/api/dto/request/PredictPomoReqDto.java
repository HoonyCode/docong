package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PredictPomoReqDto {
    String birth;
    String gender;
    String job;
    Integer position;
    String mbti;
    Integer importance;
    Integer proficiency;
    Integer type;
    String start_time;
    String end_time;
    String time_status;
}
