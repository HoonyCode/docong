package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.*;
import com.b5f1.docong.api.dto.response.FindTeamResDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.queryrepository.TeamUserQueryRepositoryImpl;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import com.b5f1.docong.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TeamServiceImplTest {
    @Autowired
    private  UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamServiceImpl teamService;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private TeamUserRepository teamUserRepository;
    @Autowired
    private TeamUserQueryRepositoryImpl teamUserQueryRepository;

    @Test
    void saveTest(){
        //given
        User findUser = joinUser("teat1");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getSeq(), "saveTest");
        //when
        Long seq = teamService.createTeam(teamReqDto);
        Optional<Team> save = teamRepository.findById(seq);
        //then
        assertThat(save.get().getName()).isEqualTo(save.get().getName());
    }

    @Test
    void findTest(){
        //given
        User findUser = joinUser("teat1");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getSeq(), "findTeamTest");
        //when
        Long seq = teamService.createTeam(teamReqDto);
        FindTeamResDto teamResDto = teamService.findTeam(seq);
        Long teamId = teamResDto.getTeamId();
        Long userCount = teamResDto.getUserList().stream().count();
        User leader = teamResDto.getLeader();
        //then
        assertThat(teamId).isEqualTo(seq);
        assertThat(userCount).isEqualTo(1);
        assertThat(leader.getSeq()).isEqualTo(findUser.getSeq());
    }

    @Test
    void updateTest(){
        //given
        User findUser = joinUser("teat1");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getSeq(), "updateTeamTest");
        Long seq = teamService.createTeam(teamReqDto);
        //when
        Optional<Team> save = teamRepository.findById(seq);
        UpdateTeamReqDto updateTeamReqDto = new UpdateTeamReqDto(save.get().getSeq(),findUser.getSeq(),"changedTeamName");
        Long result = teamService.updateTeam(updateTeamReqDto);
        Optional<Team> findTeam = teamRepository.findById(save.get().getSeq());
        //then
        System.out.println("result = " + result);
        System.out.println("findTeam.get().getName() = " + findTeam.get().getName());
        assertThat(findTeam.get().getName()).isEqualTo("changedTeamName");
    }

    @Test
    void deleteTest(){
        //given
        User findUser = joinUser("teat1");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getSeq(), "deleteTeamTest");
        Long seq = teamService.createTeam(teamReqDto);
        //when
        teamService.deleteTeam(seq);
        Optional<Team> find = teamRepository.findById(seq);
        System.out.println("find.isPresent() = " + find.isPresent());
        List<TeamUser> teamUsers = teamUserRepository.findAll();
        System.out.println("teamUsers.stream().count() = " + teamUsers.stream().count());
        long count = teamUsers
                .stream()
                .filter(teamUser -> teamUser.getTeam().getSeq() == seq)
                .count();
        System.out.println("count = " + count);
        //then
        assertThat(find.isPresent()).isEqualTo(false);
        assertThat(count).isEqualTo(0);
    }

    @Test
    void addTeamMemberTest(){
        //given
        User findUser1 = joinUser("teat1");
        User findUser2 = joinUser("teat2");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser1.getSeq(), "addTeamMemberTest");
        Long seq = teamService.createTeam(teamReqDto);
        //when
        SaveAndDeleteTeamUserReqDto teamUserReqDto = new SaveAndDeleteTeamUserReqDto(seq, findUser2.getSeq(), findUser1.getSeq());
        teamService.addTeamMember(teamUserReqDto);
        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithTeamId(seq);
        //then
        assertThat(teamUsers.size()).isEqualTo(2);

    }

    @Test
    void deleteTeamMemberTest(){
        //given
        User findUser1 = joinUser("teat1");
        User findUser2 = joinUser("teat2");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser1.getSeq(), "deleteTeamMemberTest");
        Long seq = teamService.createTeam(teamReqDto);
        SaveAndDeleteTeamUserReqDto teamUserReqDto = new SaveAndDeleteTeamUserReqDto(seq, findUser2.getSeq(), findUser1.getSeq());
        teamService.addTeamMember(teamUserReqDto);
        teamService.deleteTeamMember(teamUserReqDto);
        //when
        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithTeamId(seq);
        //then
        assertThat(teamUsers.size()).isEqualTo(1);
    }

    User joinUser(String email){
        JoinReqDto user = new JoinReqDto();
        user.setEmail(email+"@naver.com");
        user.setPassword("1234");
        user.setName("남수");
        user.setBirth("2005-11-23");
        user.setGender("M");
        user.setAddress("Busan");
        user.setJob("student");
        user.setPosition("student");
        userService.join(user);
        return userRepository.findByEmailAndActivateTrue(email+"@naver.com");
    }
}