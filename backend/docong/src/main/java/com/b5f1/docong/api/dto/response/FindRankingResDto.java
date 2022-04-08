package com.b5f1.docong.api.dto.response;

import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FindRankingResDto {
    String userName;
    String userEmail;
    Integer pomoCount;
}
