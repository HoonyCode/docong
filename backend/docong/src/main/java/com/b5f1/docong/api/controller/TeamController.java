package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.service.TeamService;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/team")
@RequiredArgsConstructor
public class TeamController {
    //    private final UserRepository userRepository;
    private final TeamService teamService;


    @PostMapping()
    public ResponseEntity<Team> createTeam(@RequestBody @Validated SaveTeamReqDto teamReqDto) {
        System.out.println("teamReqDto.getName() = " + teamReqDto.getName());
        Team team = teamService.createTeam(teamReqDto);
        return ResponseEntity.ok().body(team);
    }

    @PutMapping("/{team_id}")
    public ResponseEntity<String> updateTeam() {
        //user_id가 리더인지 확인
        //team_id가 존재하는지 확인
        //존재한다면 team정보 수정
        return null;
    }

    @GetMapping("/{team_id}")
    public ResponseEntity<String> findTeam(@PathVariable Long team_id) {
        //team_id가 존재하는지 확인
        //존재한다면 team정보 반환
        return null;
    }

    @GetMapping
    public ResponseEntity<String> findAllTeam() {
        //모든 team list반환
        return ResponseEntity.ok().body("ok");
    }

    @DeleteMapping("/{team_id}")
    public ResponseEntity<String> deleteTeam(@PathVariable Long team_id) {
        //팀이 존재하는지 확인
        //위 조건을 만족한다면 팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        return null;
    }

    @PostMapping("/member")
    public ResponseEntity<String> addTeamMember() {
        //request body에서 team_id와 member_id를 받는다.
        //team_id가 있는지 확인
        //member_id가 회원인지 확인
        //회원이면 TeamUser에 멤버추가
        return null;
    }

    @DeleteMapping("/{team_id}/{member_id}")
    public ResponseEntity<String> deleteTeamMember(@PathVariable Long team_id, @PathVariable Long member_id) {
        //team_id, member_id, user_id가 숫자인지 확인
        //팀이 존재하는지 확인
        //팀에 멤버가 존재하는지 확인
        //user_id가 팀장인지 확인
        //위 조건을 만족한다면 팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        return null;
    }


}
