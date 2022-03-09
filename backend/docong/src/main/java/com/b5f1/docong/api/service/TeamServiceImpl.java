package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamServiceImpl implements TeamService{
    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;

    @Override
    public Long createTeam(SaveTeamReqDto teamReqDto){
        //user_id가 있는지 확인한다.
        //team을 생성한다.
        Team team = Team.builder()
                .name(teamReqDto.getName())
                .build();
        Team save = teamRepository.save(team);
        //user를 리더 지정해 teamUser테이블에 추가한다.
        TeamUser teamUser = TeamUser.builder()
                                    .teamSeq(save.getSeq())
                                    .leader(true)
                                    .build();
        teamUserRepository.save(teamUser);
        return save.getSeq();
    }

    @Override
    public Long updateTeam(UpdateTeamReqDto teamReqDto) {
        //user_id가 리더인지 확인
        //team_id가 존재하는지 확인
        //존재한다면 team정보 수정
        LocalDateTime now = LocalDateTime.now();
        Team find = teamRepository.findById(teamReqDto.getTeamId())
                                    .orElseThrow(()->new IllegalStateException("없는 Team 입니다."));
        find.changeName(teamReqDto.getName());
        find.preUpdate();
        return teamReqDto.getTeamId();
    }
    @Override
    public void deleteTeam(Long team_id){
        //팀이 존재하는지 확인
        //팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        List<TeamUser> teamUserList = teamUserRepository.findAll()
                                                        .stream()
                                                        .filter(teamUser -> teamUser.getTeamSeq() == team_id)
                                                        .collect(Collectors.toList());
        teamUserRepository.deleteAll(teamUserList);
        teamRepository.deleteById(team_id);
        return;
    }
    private boolean isTeam(Long id){
        return teamRepository.existsById(id);
    }
//    private boolean isUser(Long id){
//        return userRepository.existsById(id);
//    }
}
