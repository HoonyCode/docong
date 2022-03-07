package com.b5f1.docong.core.repository;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.api.service.TeamService;
import com.b5f1.docong.core.domain.group.Team;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TeamRepositoryTest {

    @Autowired
    private TeamService teamService;
    @Autowired
    private TeamRepository teamRepository;

    @Test
    void saveTest(){
        //given
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(1l, "team1");
        //when
        Team save = teamService.createTeam(teamReqDto);
        //then
        assertThat(save.getName()).isEqualTo(save.getName());
    }

    @Test
    void updateTest(){
        //given
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(1l, "updateTeamTest");
        Team save = teamService.createTeam(teamReqDto);
        //when
        LocalDateTime now = LocalDateTime.now();
        UpdateTeamReqDto updateTeamReqDto = new UpdateTeamReqDto(save.getSeq(),1l,"changedTeamName");
        int result = teamService.updateTeam(updateTeamReqDto);
        Optional<Team> findTeam = teamRepository.findById(save.getSeq());
        //then
        System.out.println("result = " + result);
        System.out.println("findTeam.get().getName() = " + findTeam.get().getName());
        assertThat(findTeam.get().getName()).isEqualTo("changedTeamName");
    }

}