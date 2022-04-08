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
    Integer realPomo;
    WorkProficiency workProficiency;
    WorkType workType;
    WorkImportance workImportance;
    String userEmail;
    String userName;
    String userImg;
    Boolean activate;

    public FindTodoResDto(Todo todo) {
        this.seq = todo.getSeq();
        this.title = todo.getTitle();
        this.content = todo.getContent();
        this.status =todo.getStatus();
        this.predictedPomo = todo.getPredictedPomo();
        this.realPomo = todo.getRealPomo();
        this.workProficiency = todo.getWorkProficiency();
        this.workType = todo.getWorkType();
        this.workImportance = todo.getWorkImportance();
        this.userEmail = todo.getUserTodo().getUser().getEmail();
        this.userName = todo.getUserTodo().getUser().getName();
        this.userImg = todo.getUserTodo().getUser().getImage();
        this.activate = todo.getActivate();
    }
}
