package com.b5f1.docong.api.dto.response;

import com.b5f1.docong.core.domain.todo.WorkType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindWorktypeAnalysisResDto {
    WorkType workType;
    Integer totalPomo;
    Long countTodo;
}
