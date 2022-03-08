package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.ModifyTodoStatusReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.UserTodo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoServiceImpl implements TodoService{
    private final TodoRepository todoRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    @Override
    public Long saveTodo(SaveTodoReqDto reqDto) {
        User user = userRepository.findById(reqDto.getUserId())
                .orElseThrow(()->new IllegalStateException("없는 user입니다."));

        Todo todo = reqDto.toEntity();
        UserTodo userTodo = UserTodo.builder()
                .build();

        todo.addUserTodo(userTodo);
        user.addUserTodo(userTodo);

        if(reqDto.getTeamId() != null){
            Team team = teamRepository.findById(reqDto.getTeamId())
                    .orElseThrow(()->new IllegalStateException("없는 team입니다."));
            todo.addTeam(team);
        }

        return todoRepository.save(todo).getSeq();
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()->new IllegalStateException("없는 Todo 입니다."));
        todoRepository.delete(todo);
    }

    @Override
    public void modifyTodo(Long id, SaveTodoReqDto reqDto) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()->new IllegalStateException("없는 Todo 입니다."));
        todo.changeTodo(reqDto.getTitle(), reqDto.getContent(), reqDto.getWorkImportance(),reqDto.getWorkProficiency(),reqDto.getWorkType());
    }

    @Override
    public void modifyStatus(Long id, ModifyTodoStatusReqDto reqDto) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()->new IllegalStateException("없는 Todo 입니다."));
        todo.changeStatus(reqDto.getTodoStatus());
    }
}
