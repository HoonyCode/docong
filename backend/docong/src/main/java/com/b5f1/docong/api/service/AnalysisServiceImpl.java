package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.*;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.pomodoro.Pomodoro;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.queryrepository.AnalysisQueryRepository;
import com.b5f1.docong.core.queryrepository.TeamUserQueryRepository;
import com.b5f1.docong.core.queryrepository.TodoQueryRepository;
import com.b5f1.docong.core.repository.PomodoroRepository;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class AnalysisServiceImpl implements AnalysisService {

    private final UserRepository userRepository;
    private final AnalysisQueryRepository analysisQueryRepository;
    final PomodoroRepository pomodoroRepository;
    private final TeamUserQueryRepository teamUserQueryRepository;
    private final TodoQueryRepository todoQueryRepository;

    @Override
    public List<FindRankingResDto> findPomoRanking() {
        List<User> users = userRepository.findAllByActivateTrue();
        List<FindRankingResDto> response = new ArrayList<>();
        for (User u : users) {
            response.add(new FindRankingResDto(u.getName(), u.getEmail(), u.getRealPomo()));
        }
        Collections.sort(response, new Comparator<FindRankingResDto>() {
            @Override
            public int compare(FindRankingResDto o1, FindRankingResDto o2) {
                return -Integer.compare(o1.getPomoCount(), o2.getPomoCount());
            }
        });
        if (response.size() >= 20) return response.subList(0, 20);
        return response;
    }

    @Override
    public List<FindWorktypeAnalysisResDto> findWorktypeAnalysis(User user) {
        return analysisQueryRepository.findTodosByUserSeq(user.getSeq());
    }


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

    @Override
    public FindPomoTimeResDto findPomoTime(Long id) {
        // 통합 뽀모 시간
        Optional<User> user = userRepository.findById(id);
        Integer totalPomoCount = user.get().getRealPomo();

        // 그룹 뽀모 시간
        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithUserId(id);

        List<FindPomoByGroupResDto> teamPomoCount = new ArrayList<>();
        Integer teamTotalCount = 0;

        for (TeamUser teamUser : teamUsers) {
            String teamName = teamUser.getTeam().getName();
            Long teamSeq = teamUser.getTeam().getSeq();
            List<FindTodoResDto> todos = todoQueryRepository.findAllWithUserIdAndGroupId(id, teamSeq);
            Integer pomoCount = 0;

            for (FindTodoResDto todo : todos) {
                pomoCount += todo.getRealPomo();
            }

            teamPomoCount.add(new FindPomoByGroupResDto(teamName, pomoCount));
            teamTotalCount += pomoCount;
        }

        // 개인 뽀모 시간
        Integer singlePomoCount = totalPomoCount - teamTotalCount;

        return new FindPomoTimeResDto(singlePomoCount, teamPomoCount, totalPomoCount);
    }

    @Override
    public List<FindGroupRankingResDto> findGroupRanking(Long team_id) {
        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithTeamId(team_id);
        List<FindGroupRankingResDto> responce = new ArrayList<>();

        for (TeamUser teamuser : teamUsers) {
            User user = teamuser.getUser();
            List<FindTodoResDto> todos = todoQueryRepository.findAllWithUserIdAndGroupId(user.getSeq(), team_id);
            Integer pomoCount = 0;

            for (FindTodoResDto todo : todos) {
                pomoCount += todo.getRealPomo();
            }

            responce.add(new FindGroupRankingResDto(user.getName(), user.getEmail(), pomoCount));
        }

        Collections.sort(responce, new Comparator<FindGroupRankingResDto>() {
            @Override
            public int compare(FindGroupRankingResDto o1, FindGroupRankingResDto o2) {
                return -Integer.compare(o1.getPomoCount(), o2.getPomoCount());
            }
        });

        return responce;
    }
}
