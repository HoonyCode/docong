package com.b5f1.docong.api.dto.request;

import com.b5f1.docong.core.domain.todo.WorkImportance;
import com.b5f1.docong.core.domain.todo.WorkProficiency;
import com.b5f1.docong.core.domain.todo.WorkType;
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
    WorkImportance importance;
    WorkProficiency proficiency;
    WorkType type;
    String start_time;
    String end_time;
    String time_status;
}
