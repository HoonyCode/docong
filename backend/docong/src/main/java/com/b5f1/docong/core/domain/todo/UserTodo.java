package com.b5f1.docong.core.domain.todo;

import com.b5f1.docong.core.domain.BaseEntity;
import com.querydsl.core.annotations.QueryEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@QueryEntity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserTodo extends BaseEntity {
    @Id @GeneratedValue
    private Long seq;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_seq")
//    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "todo_seq")
    private Todo todo;
}
