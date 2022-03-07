package com.b5f1.docong.core.domain.pomodoro;

import com.b5f1.docong.core.domain.BaseEntity;
import com.b5f1.docong.core.domain.todo.Todo;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pomodoro extends BaseEntity {

    @Id @GeneratedValue
    private Long seq;

    @Builder
    public Pomodoro(Long seq, Long user_seq, Todo todo, TimeStatus timeStatus, LocalDateTime startTime, LocalDateTime endTime, Emotion emotion, noiseStatus noise) {
        this.seq = seq;
        this.user_seq = user_seq;
        this.todo = todo;
        this.timeStatus = timeStatus;
        this.startTime = startTime;
        this.endTime = endTime;
        this.emotion = emotion;
        this.noise = noise;
    }


    //    @ManyToOne
//    @JoinColumn(name = "USER_SEQ")
    private Long user_seq;

    @ManyToOne
    @JoinColumn(name = "TODO_SEQ")
    private Todo todo;
    @Enumerated(EnumType.STRING)
    private TimeStatus timeStatus;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private Emotion emotion;
    @Enumerated(EnumType.STRING)
    private noiseStatus noise;



}
