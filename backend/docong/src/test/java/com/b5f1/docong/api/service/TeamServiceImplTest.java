package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.repository.TeamRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
}