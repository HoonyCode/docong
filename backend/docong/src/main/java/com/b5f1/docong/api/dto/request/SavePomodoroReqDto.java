package com.b5f1.docong.api.dto.request;

import com.b5f1.docong.core.domain.pomodoro.Emotion;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.pomodoro.TimeStatus;
import com.b5f1.docong.core.domain.pomodoro.noiseStatus;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SavePomodoroReqDto {

    @ApiModelProperty(value = "할일 번호", required = true, example = "1")
    private Long todo_seq;

    @NotNull
    @ApiModelProperty(value = "시간 상태 (SHORT, BASIC, LONG)", required = true, example = "SHORT")
    private TimeStatus timeStatus;

    @NotNull
    @ApiModelProperty(value = "뽀모도로 시작 시간", required = true, example = "2022-03-22T05:27:45.004Z")
    private LocalDateTime startTime;

    @NotNull
    @ApiModelProperty(value = "뽀모도로 종료 시간", required = true, example = "2022-03-22T05:27:45.004Z")
    private LocalDateTime endTime;

    @ApiModelProperty(value = "집중하지 못한 시간 (초)", required = false, example = "10")
    private Integer otherTime;

    @ApiModelProperty(value = "주변 소음 상태 (COMMON, NOISE, SILENT)", required = false, example = "COMMON")
    private noiseStatus noise;
}