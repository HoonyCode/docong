package com.b5f1.docong.core.domain.todo;

import com.b5f1.docong.core.domain.BaseEntity;
import com.querydsl.core.annotations.QueryEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseEntity {
    @Id @GeneratedValue
    private Long seq;

    @Builder
    public Todo(String name, String content, TodoStatus status, Integer predictedPomo, Integer realPomo, WorkProficiency workProficiency, WorkType workType, WorkImportance workImportance) {
        this.name = name;
        this.content = content;
        this.status = status;
        this.predictedPomo = predictedPomo;
        this.realPomo = realPomo;
        this.workProficiency = workProficiency;
        this.workType = workType;
        this.workImportance = workImportance;
    }

    //    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="group_seq")
//    private Group group;

    private String name, content;
    private TodoStatus status;

    private Integer predictedPomo, realPomo;

    private WorkProficiency workProficiency;
    private WorkType workType;
    private WorkImportance workImportance;
}
