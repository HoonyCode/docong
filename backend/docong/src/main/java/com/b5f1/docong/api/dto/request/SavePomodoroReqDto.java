package com.b5f1.docong.api.dto.request;

import com.b5f1.docong.core.domain.pomodoro.Emotion;
import com.b5f1.docong.core.domain.pomodoro.TimeStatus;
import com.b5f1.docong.core.domain.pomodoro.noiseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SavePomodoroReqDto {

    @NotNull
    private Long user_seq;
    @NotNull
    private Long todo_seq;
    @NotNull
    private TimeStatus timeStatus;
    @NotNull
    private LocalDateTime startTime;
    @NotNull
    private LocalDateTime endTime;
    private Emotion emotion;
    private noiseStatus noise;
}
