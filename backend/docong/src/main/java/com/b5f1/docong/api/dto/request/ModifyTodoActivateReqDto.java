package com.b5f1.docong.api.dto.request;

import com.b5f1.docong.core.domain.todo.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ModifyTodoActivateReqDto {
    @NotNull Boolean activate;
}
