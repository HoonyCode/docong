package com.b5f1.docong.core.queryrepository;

import com.b5f1.docong.api.dto.response.FindTodoResDto;

import java.util.List;

public interface TodoQueryRepository {
    List<FindTodoResDto> findAllWithUserId(Long userSeq);
    List<FindTodoResDto> findAllWithGroupId(Long groupSeq);
}
