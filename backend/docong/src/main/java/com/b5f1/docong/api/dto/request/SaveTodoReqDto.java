package com.b5f1.docong.api.dto.request;

import com.b5f1.docong.core.domain.todo.*;
import com.sun.istack.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaveTodoReqDto {
    @NotNull
    public String title;
    @NotNull
    public String content;
    public Long teamId;
    public String userEmail;
    public WorkProficiency workProficiency;
    public WorkType workType;
    public WorkImportance workImportance;
    public Integer predictedPomo;

    public Todo toEntity(){
        return Todo.builder()
                .title(title)
                .content(content)
                .workProficiency(workProficiency)
                .workImportance(workImportance)
                .workType(workType)
                .predictedPomo(predictedPomo)
                .realPomo(0)
                .status(TodoStatus.TODO)
                .build();
    }
}
