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
public class UserTodo extends BaseEntity {
    @Id @GeneratedValue
    private Long seq;

    @Builder
    public UserTodo(Todo todo) {
        this.todo = todo;
    }

    //    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_seq")
//    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "todo_seq")
    private Todo todo;

    public void changeTodo(Todo todo){
        this.todo = todo;
    }
}
