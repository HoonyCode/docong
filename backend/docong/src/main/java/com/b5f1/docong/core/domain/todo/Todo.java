package com.b5f1.docong.core.domain.todo;

import com.b5f1.docong.core.domain.BaseEntity;
import com.b5f1.docong.core.domain.group.Team;
import com.querydsl.core.annotations.QueryEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseEntity {
    @Id @GeneratedValue
    private Long seq;

    @Builder
    public Todo(String title, String content, TodoStatus status, Integer predictedPomo, Integer realPomo, WorkProficiency workProficiency, WorkType workType, WorkImportance workImportance) {
        this.title = title;
        this.content = content;
        this.status = status;
        this.predictedPomo = predictedPomo;
        this.realPomo = realPomo;
        this.workProficiency = workProficiency;
        this.workType = workType;
        this.workImportance = workImportance;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="team_seq")
    private Team team;

    private String title, content;
    private TodoStatus status;

    private Integer predictedPomo, realPomo;

    private WorkProficiency workProficiency;
    private WorkType workType;
    private WorkImportance workImportance;

    @OneToMany(mappedBy="todo", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserTodo> userTodos = new ArrayList<>();

    public void addTeam(Team team) {
        this.team = team;
    }
    public void addUserTodo(UserTodo userTodo){
        userTodos.add(userTodo);
        userTodo.changeTodo(this);
    }
    public void changeTodo(String title, String content, WorkImportance workImportance, WorkProficiency workProficiency, WorkType workType) {
        this.title = title;
        this.content = content;
        this.workImportance = workImportance;
        this.workProficiency = workProficiency;
        this.workType = workType;
    }

    public void changeStatus(TodoStatus todoStatus) {
        this.status = todoStatus;
    }


}
