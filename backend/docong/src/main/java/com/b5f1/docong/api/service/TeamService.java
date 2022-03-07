package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;

    public Team createTeam(SaveTeamReqDto teamReqDto){
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
        System.out.println("teamUser = " + teamUser.getTeamSeq());
        teamUserRepository.save(teamUser);
        return save;
    }

    public int updateTeam(UpdateTeamReqDto teamReqDto) {
        //user_id가 리더인지 확인
        //team_id가 존재하는지 확인
        if(!isTeam(teamReqDto.getTeamId())){
            return -1;
        }
        //존재한다면 team정보 수정
        LocalDateTime now = LocalDateTime.now();
        int result = teamRepository.updateTeamName(now, teamReqDto.getName(), teamReqDto.getTeamId());
        teamRepository.flush();
        return result;
    }
    private boolean isTeam(Long id){
        return teamRepository.existsById(id);
    }
//    private boolean isUser(Long id){
//        return userRepository.existsById(id);
//    }
}
