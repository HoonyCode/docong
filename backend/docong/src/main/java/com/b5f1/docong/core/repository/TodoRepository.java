package com.b5f1.docong.core.repository;

import com.b5f1.docong.core.domain.todo.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    Todo findByJiraIssueId(String issueId);

}
