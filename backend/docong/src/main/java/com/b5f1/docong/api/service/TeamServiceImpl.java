package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.SaveAndDeleteTeamUserReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.api.dto.response.*;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.queryrepository.TeamUserQueryRepositoryImpl;
import com.b5f1.docong.core.queryrepository.TodoQueryRepository;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
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
    private final TodoQueryRepository todoQueryRepository;

    @Override
    public Long createTeam(SaveTeamReqDto teamReqDto) {
        //user_id가 있는지 확인한다.
        User user = getUserByEmail(teamReqDto.getUserEmail());
        //team을 생성한다.
        Team team = teamBuilder(teamReqDto.getName());
        teamRepository.save(team);
        //user를 리더 지정해 teamUser테이블에 추가한다.
        TeamUser teamUser = teamUserBuilder(team, user, true);
        teamUserRepository.save(teamUser);
        return team.getSeq();
    }

    @Override
    public Long updateTeam(UpdateTeamReqDto teamReqDto) {
        //user_id가 리더인지 확인
        User user = getUserByEmail(teamReqDto.getUserEmail());
        TeamUser teamUser = getTeamUser(user.getSeq(), teamReqDto.getTeamId());
        if (!teamUser.isLeader()) {
            throw new CustomException(ErrorCode.INVALID_USER);
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
        // 관련 투두 NULL 처리
        List<Todo> todos = todoQueryRepository.findTodosWithTeamSeq(team_id);
        for(Todo todo:todos){
            todo.deleteTodo();
            todo.addTeam(null);
        }
        //팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        List<TeamUser> teamUserList = teamUserQueryRepository.findTeamUserWithTeamId(team_id);
        teamUserRepository.deleteAll(teamUserList);
        //팀이 존재하는지 확인 후 삭제(하도록 구현되어 있음)
        teamRepository.deleteById(team_id);
    }

    @Override
    public FindTeamResDto findTeam(Long team_id) {
        List<UserSimpleInfoResDto> userList = new ArrayList<>();
        //team_id가 존재하는지 확인
        Team team = getTeam(team_id);

        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithTeamId(team_id);

        teamUsers.stream()
                .forEach(teamUser -> {
                    User user = teamUser.getUser();
                    userList.add(new UserSimpleInfoResDto(user.getEmail(), user.getImage(), user.getName()));});

        Optional<TeamUser> leader = teamUsers.stream()
                .filter(teamUser -> teamUser.isLeader())
                .findFirst();

        FindTeamResDto findTeamResDto = new FindTeamResDto(team.getSeq(), team.getName(), team.getJiraDomain(), team.getJiraUserId(), team.getJiraAPIToken(), team.getJiraProjectKey(), userList, leader.get().getUser().getEmail());
        return findTeamResDto;
    }
    @Override
    public List<FindTeamResDto> findAllTeam(Long user_id){
        List<FindTeamResDto> result = new ArrayList<>();
        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithUserId(user_id);
        teamUsers.stream()
                .forEach(teamUser -> {
                    Team team = teamUser.getTeam();
                    FindTeamResDto teamResDto = findTeam(team.getSeq());
                    result.add(teamResDto);
                });
        return result;
    }
    @Override
    public void addTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto, Long reqUserId) {
        //팀이 존재하는지 확인
        Team team = getTeam(teamUserReqDto.getTeamId());
        //추가하려는 유저가 회원인지 확인
        User user = getUserByEmail(teamUserReqDto.getUserEmail());
        //요청자가 리더인지 확인
        TeamUser findReqTeamUser = getTeamUser(reqUserId, teamUserReqDto.getTeamId());

        if (!findReqTeamUser.isLeader()) {
            throw new CustomException(ErrorCode.INVALID_USER);
        }

        //같은 유저를 넣으려고할 경우
        Optional<TeamUser> findTeamUser = teamUserQueryRepository.findTeamUserWithUserIdAndTeamId(user.getSeq(), teamUserReqDto.getTeamId());
        if (findTeamUser.isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
        //회원이면 TeamUser에 멤버추가
        TeamUser teamUser = teamUserBuilder(team, user, false);
        teamUserRepository.save(teamUser);
    }

    @Override
    public void deleteTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto, Long reqUserId) {
        //팀이 존재하는지 확인
        Team team = getTeam(teamUserReqDto.getTeamId());
        //삭제하려는 유저가 회원인지 확인
        User user = getUserByEmail(teamUserReqDto.getUserEmail());
        //삭제할 TeamUser가져오기
        TeamUser findeamUser = getTeamUser(user.getSeq(), teamUserReqDto.getTeamId());
        //삭제 요청한 사람과 member_id가 같거나 삭제 요청한 사람이 팀장이면 member_id 삭제
        TeamUser findReqTeamUser = getTeamUser(reqUserId, teamUserReqDto.getTeamId());
        if (!findReqTeamUser.isLeader() && findReqTeamUser.getUser().getSeq() != user.getSeq()) {
            throw new CustomException(ErrorCode.INVALID_USER);
        }
        //팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        teamUserRepository.delete(findeamUser);
    }

    @Override
    public List<FindMemberActivateResDto> findMemberWithActivate(Long team_id) {
        return teamUserQueryRepository.findMemberActivate(team_id);
    }


    public boolean isTeam(Long team_id) {
        //team_id가 있는지 확인
        return teamRepository.existsById(team_id);
    }

    private User getUserById(Long userSeq) {
        return userRepository.findById(userSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
    private User getUserByEmail(String userEmail) {
        User user = userRepository.findByEmailAndActivateTrue(userEmail);
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return user;
    }
    private Team getTeam(Long teamSeq) {
        return teamRepository.findById(teamSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
    }

    private TeamUser getTeamUser(Long userSeq, Long teamSeq) {
        TeamUser teamUser = teamUserQueryRepository.findTeamUserWithUserIdAndTeamId(userSeq,teamSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
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
