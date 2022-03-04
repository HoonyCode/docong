package com.b5f1.docong.core.repository;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.core.domain.group.Team;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TeamRepositoryTest {

    @Autowired
    private TeamRepository teamRepository;

    @BeforeEach
    void before(){

    }
    @AfterEach
    void after(){

    }
    @Test
    void saveTest(){
        //given
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(1l, "team1");
        Team team = Team.builder().name(teamReqDto.getName()).build();
        //when
        Team save = teamRepository.save(team);
        //then
        assertThat(save.getName()).isEqualTo(team.getName());
    }

}