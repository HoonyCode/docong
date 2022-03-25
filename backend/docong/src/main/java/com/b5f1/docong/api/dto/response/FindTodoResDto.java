package com.b5f1.docong.api.dto.response;

import com.b5f1.docong.core.domain.todo.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FindTodoResDto {
    Long seq;
    String title;
    String content;
    TodoStatus status;
    Integer predictedPomo;
    Double realPomo;
    WorkProficiency workProficiency;
    WorkType workType;
    WorkImportance workImportance;
    String userEmail;

    public FindTodoResDto(Todo todo) {
        this.seq = todo.getSeq();
        this.title = todo.getTitle();
        this.content = todo.getContent();
        this.status =todo.getStatus();
        this.predictedPomo = todo.getPredictedPomo();
        this.realPomo = todo.getRealPomo()*1.0/2;
        this.workProficiency = todo.getWorkProficiency();
        this.workType = todo.getWorkType();
        this.workImportance = todo.getWorkImportance();
        this.userEmail = todo.getUserTodo().getUser().getEmail();
    }
}
