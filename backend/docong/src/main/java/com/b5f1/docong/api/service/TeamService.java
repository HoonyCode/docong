package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;
    private final EntityManager em;

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

//    private boolean isUser(Long id){
//        return userRepository.existsById(id);
//    }
}
