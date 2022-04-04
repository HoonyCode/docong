package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.FindAllDateCountResDto;
import com.b5f1.docong.api.dto.response.PomoDayCountResDto;
import com.b5f1.docong.api.dto.response.PomoTimeCountResDto;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.repository.PomodoroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalysisService2Impl implements AnalysisService2 {

    final PomodoroRepository pomodoroRepository;

    @Override
    public PomoDayCountResDto findPomoCountByUserSolo(Long userSeq) {

        List<Pomodoro> pomodoros = pomodoroRepository.findDayCountByUserSolo(userSeq);

        long day = 0l;
        long week = 0l;
        long month = pomodoros.size();

        LocalDateTime now = LocalDateTime.now();
        for (Pomodoro pomodoro : pomodoros) {
            if (pomodoro.getStartTime().compareTo(now.minusDays(1)) >= 0) {
                week++;
                day++;
                continue;
            }
            if (pomodoro.getStartTime().compareTo(now.minusWeeks(1)) >= 0) {
                week++;
            }
        }

        return new PomoDayCountResDto(day, week, month);
    }

    @Override
    public PomoDayCountResDto findPomoCountByUserGroup(Long userSeq, Long groupSeq) {
        List<Pomodoro> pomodoros = pomodoroRepository.findDayCountByUserGroup(userSeq, groupSeq);

        long day = 0l;
        long week = 0l;
        long month = pomodoros.size();

        LocalDateTime now = LocalDateTime.now();
        for (Pomodoro pomodoro : pomodoros) {
            if (pomodoro.getStartTime().compareTo(now.minusDays(1)) >= 0) {
                week++;
                day++;
                continue;
            }
            if (pomodoro.getStartTime().compareTo(now.minusWeeks(1)) >= 0) {
                week++;
            }
        }

        return new PomoDayCountResDto(day, week, month);
    }


    @Override
    public List<PomoTimeCountResDto> findTimeCountByUserSolo(Long userSeq) {
        List<PomoTimeCountResDto> result = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            result.add(new PomoTimeCountResDto(i, 0L));
        }
        List<PomoTimeCountResDto> pomoTimeCountResDtoList = pomodoroRepository.findTimeCountByUserSolo(userSeq);
        for (PomoTimeCountResDto in : pomoTimeCountResDtoList) {
            result.get(in.getHour()).setCnt(in.getCnt());
        }
        return result;
    }

    @Override
    public List<PomoTimeCountResDto> findTimeCountByUserGroup(Long userSeq, Long groupSeq) {
        List<PomoTimeCountResDto> result = new ArrayList<>();
        for (int i = 0; i < 24; i++) {
            result.add(new PomoTimeCountResDto(i, 0L));
        }
        List<PomoTimeCountResDto> pomoTimeCountResDtoList = pomodoroRepository.findTimeCountByUserGroup(userSeq, groupSeq);
        for (PomoTimeCountResDto in : pomoTimeCountResDtoList) {
            result.get(in.getHour()).setCnt(in.getCnt());
        }
        return result;
    }

    @Override
    public List<FindAllDateCountResDto> findAllDateCountByUser(Long userSeq, int year) {

        List<FindAllDateCountResDto> findAllDateCountResDto = pomodoroRepository.findAllDateByUser(userSeq, year);

        Map<LocalDate, FindAllDateCountResDto> map = new FindAllDateCountResDto().MakeDate(year);

        for (FindAllDateCountResDto temp : findAllDateCountResDto) {
            map.replace(temp.getLocalDate(), temp);
        }

        List<FindAllDateCountResDto> result = new ArrayList<>(map.values());

        Collections.sort(result, (o1, o2) -> {
            return o1.getLocalDate().compareTo(o2.getLocalDate());
        });
        return result;
    }

    @Override
    public List<FindAllDateCountResDto> findAllDateCountByGroup(Long groupSeq, int year) {

        List<FindAllDateCountResDto> findAllDateCountResDto = pomodoroRepository.findAllDateByUser(groupSeq, year);

        Map<LocalDate, FindAllDateCountResDto> map = new FindAllDateCountResDto().MakeDate(year);

        for (FindAllDateCountResDto temp : findAllDateCountResDto) {
            map.replace(temp.getLocalDate(), temp);
        }

        List<FindAllDateCountResDto> result = new ArrayList<>(map.values());

        Collections.sort(result, (o1, o2) -> {
            return o1.getLocalDate().compareTo(o2.getLocalDate());
        });
        return result;
    }

}
