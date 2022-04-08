package com.b5f1.docong.core.domain.todo;

import com.b5f1.docong.core.domain.BaseEntity;
import com.b5f1.docong.core.domain.user.User;
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
    public UserTodo(User user, Todo todo) {
        this.user = user;
        this.todo = todo;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "todo_seq")
    private Todo todo;

    public void changeTodo(Todo todo){
        this.todo = todo;
    }
    public void changeUser(User user){
        this.user = user;
    }
}
