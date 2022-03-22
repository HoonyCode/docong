package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.ModifyTodoStatusReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.dto.response.FindTodoResDto;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.UserTodo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.queryrepository.TodoQueryRepository;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoServiceImpl implements TodoService{
    private final TodoRepository todoRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TodoQueryRepository todoQueryRepository;
    @Override
    public Long saveTodo(SaveTodoReqDto reqDto) {
        User user = userRepository.findByEmailAndActivateTrue(reqDto.getUserEmail());

        Todo todo = reqDto.toEntity();
        UserTodo userTodo = UserTodo.builder()
                .build();

        todo.addUserTodo(userTodo);
        user.addUserTodo(userTodo);

        if(reqDto.getTeamId() != null){
            Team team = teamRepository.findById(reqDto.getTeamId())
                    .orElseThrow(()->new CustomException(ErrorCode.TEAM_NOT_FOUND));
            todo.addTeam(team);
        }

        return todoRepository.save(todo).getSeq();
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = getTodo(id);
        todoRepository.delete(todo);
    }

    @Override
    public void modifyTodo(Long id, SaveTodoReqDto reqDto) {
        Todo todo = getTodo(id);
        todo.changeTodo(reqDto.getTitle(), reqDto.getContent(), reqDto.getWorkImportance(),reqDto.getWorkProficiency(),reqDto.getWorkType(), reqDto.getPredictedPomo());
    }

    @Override
    public void modifyStatus(Long id, ModifyTodoStatusReqDto reqDto) {
        Todo todo = getTodo(id);
        todo.changeStatus(reqDto.getTodoStatus());
    }

    @Override
    public FindTodoResDto findTodo(Long id) {
        Todo todo = getTodo(id);
        return new FindTodoResDto(todo);
    }

    @Override
    public List<FindTodoResDto> findUserTodos(Long userSeq) {
        return todoQueryRepository.findAllWithUserId(userSeq);
    }

    @Override
    public List<FindTodoResDto> findGroupTodos(Long groupSeq) {
        return todoQueryRepository.findAllWithGroupId(groupSeq);
    }

    private Todo getTodo(Long id){
        return todoRepository.findById(id)
                .orElseThrow(()->new CustomException(ErrorCode.TODO_NOT_FOUND));
    }
}
