package com.b5f1.docong.core.repository;

import com.b5f1.docong.core.domain.todo.UserTodo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTodoRepository extends JpaRepository<UserTodo, Long> {
}
