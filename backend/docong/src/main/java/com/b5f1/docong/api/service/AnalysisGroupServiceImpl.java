package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.FindGroupRankingResDto;
import com.b5f1.docong.api.dto.response.FindPomoByGruopResDto;
import com.b5f1.docong.api.dto.response.FindPomoTimeResDto;
import com.b5f1.docong.api.dto.response.FindTodoResDto;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.queryrepository.TeamUserQueryRepository;
import com.b5f1.docong.core.queryrepository.TodoQueryRepository;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class AnalysisGroupServiceImpl implements AnalysisGroupService {

    private final UserRepository userRepository;
    private final TeamUserQueryRepository teamUserQueryRepository;
    private final TodoQueryRepository todoQueryRepository;

    @Override
    public FindPomoTimeResDto findPomoTime(Long id) {
        // 개인 뽀모 시간
        Optional<User> user = userRepository.findById(id);
        Integer singlePomoCount = user.get().getRealPomo();

        // 그룹 뽀모 시간
        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithUserId(id);

        List<FindPomoByGruopResDto> teamPomoCount = new ArrayList<>();
        Integer teamTotalCount = 0;

        for (TeamUser teamUser : teamUsers) {
            String teamName = teamUser.getTeam().getName();
            Long teamSeq = teamUser.getTeam().getSeq();
            List<FindTodoResDto> todos = todoQueryRepository.findAllWithUserIdAndGroupId(id, teamSeq);
            Integer pomoCount = 0;

            for (FindTodoResDto todo : todos) {
                pomoCount += todo.getRealPomo();
            }

            teamPomoCount.add(new FindPomoByGruopResDto(teamName, pomoCount));
            teamTotalCount += pomoCount;
        }

        // 통합 뽀모 시간
        Integer totalPomoCount = singlePomoCount + teamTotalCount;

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
