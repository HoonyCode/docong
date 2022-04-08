package com.b5f1.docong.api.dto.response;

import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.pomodoro.TimeStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindUserWithPomoResDto {
    String userName;
    String userEmail;
    List<Pomodoro> pomodoros = new ArrayList<>();
}
