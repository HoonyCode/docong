package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindWorktypeAnalysisResDto;
import com.b5f1.docong.core.domain.todo.Todo;

import java.util.List;

public interface AnalysisQueryRepository {
    List<FindWorktypeAnalysisResDto> findTodosByUserSeq(Long userSeq);
}
