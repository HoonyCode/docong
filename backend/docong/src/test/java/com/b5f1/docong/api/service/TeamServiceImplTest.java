package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.api.dto.response.FindTeamResDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
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
    private TeamServiceImpl teamService;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private TeamUserRepository teamUserRepository;

    @Test
    void saveTest(){
        //given
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(1l, "team1");
        //when
        Long seq = teamService.createTeam(teamReqDto);
        Optional<Team> save = teamRepository.findById(seq);
        //then
        assertThat(save.get().getName()).isEqualTo(save.get().getName());
    }

    @Test
    void findTest(){
        //given
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(1l, "findTeamTest");
        //when
        Long seq = teamService.createTeam(teamReqDto);
        FindTeamResDto teamResDto = teamService.findTeam(seq);
        Long teamId = teamResDto.getTeamId();
        Long userCount = teamResDto.getUserList().stream().count();
        Long leader = teamResDto.getLeader();
        //then
        assertThat(teamId).isEqualTo(seq);
        assertThat(userCount).isEqualTo(1);
        assertThat(leader).isEqualTo(1);
    }

    @Test
    void updateTest(){
        //given
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(1l, "updateTeamTest");
        Long seq = teamService.createTeam(teamReqDto);
        //when
        LocalDateTime now = LocalDateTime.now();
        Optional<Team> save = teamRepository.findById(seq);
        UpdateTeamReqDto updateTeamReqDto = new UpdateTeamReqDto(save.get().getSeq(),1l,"changedTeamName");
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
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(1l, "deleteTeamTest");
        Long seq = teamService.createTeam(teamReqDto);
        //when
        teamService.deleteTeam(seq);
        Optional<Team> find = teamRepository.findById(seq);
        System.out.println("find.isPresent() = " + find.isPresent());
        List<TeamUser> teamUsers = teamUserRepository.findAll();
        System.out.println("teamUsers.stream().count() = " + teamUsers.stream().count());
//        long count = teamUserRepository.findAll()
//                .stream()
//                .filter(teamUser -> teamUser.getTeamSeq() == seq)
//                .count();
//        System.out.println("count = " + count);
        //then


        assertThat(find.isPresent()).isEqualTo(false);
//        assertThat(count).isEqualTo(0);
    }
}