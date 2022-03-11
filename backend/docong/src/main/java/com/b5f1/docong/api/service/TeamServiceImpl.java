package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.SaveAndDeleteTeamUserReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.api.dto.response.FindTeamResDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.queryrepository.TeamUserQueryRepositoryImpl;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;
    private final TeamUserQueryRepositoryImpl teamUserQueryRepository;
    private final UserRepository userRepository;

    @Override
    public Long createTeam(SaveTeamReqDto teamReqDto) {
        //user_id가 있는지 확인한다.
        User user = getUser(teamReqDto.getUserId());
        //team을 생성한다.
        Team team = teamBuilder(teamReqDto.getName());
        teamRepository.save(team);
        //user를 리더 지정해 teamUser테이블에 추가한다.
        TeamUser teamUser = teamUserBuilder(team, user, true);
        teamUserRepository.save(teamUser);
        return team.getSeq();
    }

    private User getUser(Long userSeq) {
        return userRepository.findById(userSeq)
                .orElseThrow(() -> new IllegalStateException("없는 user 입니다."));
    }

    @Override
    public Long updateTeam(UpdateTeamReqDto teamReqDto) {
        //user_id가 리더인지 확인
        TeamUser teamUser = getTeamUser(teamReqDto.getUserId(), teamReqDto.getTeamId());
        if (!teamUser.isLeader()) {
            throw new IllegalStateException("리더가 아닙니다.");
        }
        //team_id가 존재하는지 확인
        //존재한다면 team정보 수정
        LocalDateTime now = LocalDateTime.now();
        Team find = getTeam(teamReqDto.getTeamId());
        find.changeName(teamReqDto.getName());
        find.preUpdate();
        return teamReqDto.getTeamId();
    }



    @Override
    public void deleteTeam(Long team_id) {
        //팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        List<TeamUser> teamUserList = teamUserQueryRepository.findTeamUserWithTeamId(team_id);
        teamUserRepository.deleteAll(teamUserList);
        //팀이 존재하는지 확인 후 삭제(하도록 구현되어 있음)
        teamRepository.deleteById(team_id);
    }

    @Override
    public FindTeamResDto findTeam(Long team_id) {
        List<User> userList = new ArrayList<>();
        //team_id가 존재하는지 확인
        Team team = getTeam(team_id);

        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithTeamId(team_id);

        teamUsers.stream()
                .forEach(teamUser -> userList.add(teamUser.getUser()));

        Optional<TeamUser> leader = teamUsers.stream()
                .filter(teamUser -> teamUser.isLeader())
                .findFirst();

        FindTeamResDto findTeamResDto = new FindTeamResDto(team.getSeq(), userList, team.getName(), leader.get().getUser());
        return findTeamResDto;
    }

    @Override
    public void addTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto) {
        //팀이 존재하는지 확인
        Team team = getTeam(teamUserReqDto.getTeamId());
        //요청자가 리더인지 확인
        TeamUser findReqTeamUser = getTeamUser(teamUserReqDto.getReqUserId(), teamUserReqDto.getTeamId());
        Optional<TeamUser> findTeamUser = teamUserQueryRepository.findTeamUserWithUserIdAndTeamId(teamUserReqDto.getUserId(), teamUserReqDto.getTeamId());
        if (!findReqTeamUser.isLeader()) {
            throw new IllegalStateException("리더만 팀원을 추가할 수 있습니다.");
        }
        //member_id가 회원인지 확인
        User user = getUser(teamUserReqDto.getUserId());
        //같은 유저를 넣으려고할 경우
        if (findTeamUser.isPresent()) {
            throw new IllegalStateException("이미 그룹에 포함된 멤버입니다.");
        }
        //회원이면 TeamUser에 멤버추가
        TeamUser teamUser = teamUserBuilder(team, user, false);
        teamUserRepository.save(teamUser);
    }

    @Override
    public void deleteTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto) {
        //팀이 존재하는지 확인
        Team team = getTeam(teamUserReqDto.getTeamId());
        //삭제할 TeamUser가져오기
        TeamUser findeamUser = getTeamUser(teamUserReqDto.getUserId(), teamUserReqDto.getTeamId());
        //삭제 요청한 사람과 member_id가 같거나 삭제 요청한 사람이 팀장이면 member_id 삭제
        TeamUser findReqTeamUser = getTeamUser(teamUserReqDto.getReqUserId(), teamUserReqDto.getTeamId());
        if (!findReqTeamUser.isLeader() && findReqTeamUser.getUser().getSeq() != teamUserReqDto.getUserId()) {
            throw new IllegalStateException("팀장이 아니거나 본인만 그룹을 나갈 수 있습니다.");
        }
        //팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        teamUserRepository.delete(findeamUser);
    }



    public boolean isTeam(Long team_id) {
        //team_id가 있는지 확인
        return teamRepository.existsById(team_id);
    }
    private Team getTeam(Long teamSeq) {
        return teamRepository.findById(teamSeq)
                .orElseThrow(() -> new IllegalStateException("없는 team입니다."));
    }

    private TeamUser getTeamUser(Long userSeq, Long teamSeq) {
        TeamUser teamUser = teamUserQueryRepository.findTeamUserWithUserIdAndTeamId(userSeq,teamSeq)
                .orElseThrow(() -> new IllegalStateException("없는 teamUser 입니다."));
        return teamUser;
    }

    private TeamUser teamUserBuilder(Team team, User user, boolean isLeader) {
        return TeamUser.builder()
                .team(team)
                .user(user)
                .leader(isLeader)
                .build();
    }

    private Team teamBuilder(String name) {
        return Team.builder()
                .name(name)
                .build();
    }
}
