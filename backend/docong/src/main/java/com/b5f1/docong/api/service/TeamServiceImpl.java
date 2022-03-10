package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.SaveAndDeleteTeamUserReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.api.dto.response.FindTeamResDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.group.TeamUserId;
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
        userRepository.findById(teamReqDto.getUserId())
                .orElseThrow(() -> new IllegalStateException("없는 user 입니다."));
        //team을 생성한다.
        Team team = teamBuilder(teamReqDto.getName());
        Team save = teamRepository.save(team);
        //user를 리더 지정해 teamUser테이블에 추가한다.
        TeamUser teamUser = teamUserBuilder(save.getSeq(), teamReqDto.getUserId(), false);
        teamUserRepository.save(teamUser);
        return save.getSeq();
    }

    @Override
    public Long updateTeam(UpdateTeamReqDto teamReqDto) {
        //user_id가 리더인지 확인
        TeamUser teamUser = teamUserRepository.findById(new TeamUserId(teamReqDto.getUserId(), teamReqDto.getTeamId()))
                .orElseThrow(() -> new IllegalStateException("없는 teamUser 입니다."));
        if (!teamUser.isLeader()) {
            throw new IllegalStateException("리더만 팀원을 추가할 수 있습니다.");
        }
        //team_id가 존재하는지 확인
        //존재한다면 team정보 수정
        LocalDateTime now = LocalDateTime.now();
        Team find = teamRepository.findById(teamReqDto.getTeamId())
                .orElseThrow(() -> new IllegalStateException("없는 Team 입니다."));
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
        List<Long> userList = new ArrayList<>();
        //team_id가 존재하는지 확인
        Team team = teamRepository.findById(team_id)
                .orElseThrow(() -> new IllegalStateException("없는 Team 입니다."));

        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithTeamId(team_id);

        teamUsers.stream()
                .forEach(teamUser -> userList.add(teamUser.getUserSeq()));

        Optional<TeamUser> leader = teamUsers.stream()
                .filter(teamUser -> teamUser.isLeader())
                .findFirst();

        FindTeamResDto findTeamResDto = new FindTeamResDto(team.getSeq(), userList, team.getName(), leader.get().getUserSeq());
        return findTeamResDto;
    }

    @Override
    public void addTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto) {
        //팀이 존재하는지 확인
        teamRepository.findById(teamUserReqDto.getTeamId())
                .orElseThrow(() -> new IllegalStateException("없는 team입니다."));
        //요청자가 리더인지 확인
        TeamUser findTeamUser = teamUserRepository.findById(new TeamUserId(teamUserReqDto.getReqUserId(), teamUserReqDto.getTeamId()))
                .orElseThrow(() -> new IllegalStateException("요청자가 team 멥버가 아닙니다."));
        if (!findTeamUser.isLeader()) {
            throw new IllegalStateException("리더만 팀원을 추가할 수 있습니다.");
        }
        //member_id가 회원인지 확인
        userRepository.findById(teamUserReqDto.getUserId())
                .orElseThrow(() -> new IllegalStateException("없는 user입니다."));
        //같은 유저를 넣으려고할 경우
        if (teamUserRepository.existsById(new TeamUserId(teamUserReqDto.getUserId(), teamUserReqDto.getTeamId()))) {
            throw new IllegalStateException("이미 그룹에 포함된 멤버입니다.");
        }
        //회원이면 TeamUser에 멤버추가
        TeamUser teamUser = teamUserBuilder(teamUserReqDto.getTeamId(), teamUserReqDto.getUserId(), false);
        teamUserRepository.save(teamUser);
    }

    @Override
    public void deleteTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto) {
        //팀이 존재하는지 확인
        teamRepository.findById(teamUserReqDto.getTeamId())
                .orElseThrow(() -> new IllegalStateException("없는 team입니다."));
        //없는 팀원을 삭제할 경우
        teamUserRepository.findById(new TeamUserId(teamUserReqDto.getUserId(), teamUserReqDto.getTeamId()))
                .orElseThrow(() -> new IllegalStateException("없는 팀원은 삭제할 수 없습니다."));
        //삭제 요청한 사람과 member_id가 같거나 삭제 요청한 사람이 팀장이면 member_id 삭제
        TeamUser findTeamUser = teamUserRepository.findById(new TeamUserId(teamUserReqDto.getReqUserId(), teamUserReqDto.getTeamId()))
                .orElseThrow(() -> new IllegalStateException("없는 teamUser입니다."));
        if (!findTeamUser.isLeader() && findTeamUser.getUserSeq() != teamUserReqDto.getUserId()) {
            throw new IllegalStateException("팀장이 아니거나 본인만 그룹을 나갈 수 있습니다.");
        }

        //팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        TeamUser teamUser = teamUserBuilder(teamUserReqDto.getTeamId(), teamUserReqDto.getUserId(), false);
        teamUserRepository.delete(teamUser);
    }

    public boolean isTeam(Long team_id) {
        //team_id가 있는지 확인
        return teamRepository.existsById(team_id);
    }

    private TeamUser teamUserBuilder(Long team_id, Long user_id, boolean isLeader) {
        return TeamUser.builder()
                .teamSeq(team_id)
                .userSeq(user_id)
                .leader(isLeader)
                .build();
    }

    private Team teamBuilder(String name) {
        return Team.builder()
                .name(name)
                .build();
    }
}
