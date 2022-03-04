package com.b5f1.docong.api.controller;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(name = "/team")
public class TeamController {
    @PostMapping
    public String createTeam(){
        //user_id가 있는지 확인한다.
        //team을 생성한다.
        //user를 리더지정해 teamUser테이블에 추가한다.
        return null;
    }
    @PutMapping("/{team_id}")
    public String updateTeam(){
        //team_id가 숫자인지 확인
        //team_id가 존재하는지 확인
        //존재한다면 team정보 수정
        return null;
    }
    @GetMapping("/{team_id}")
    public String findTeam(){
        //team_id가 숫자인지 확인
        //team_id가 존재하는지 확인
        //존재한다면 team정보 반환
        return null;
    }
    @GetMapping
    public String findAllTeam(){
        //모든 team list반환
        return null;
    }
    @DeleteMapping("/{team_id}")
    public String deleteTeam(){
        //팀이 존재하는지 확인
        //위 조건을 만족한다면 팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        return null;
    }
    @PostMapping("/member")
    public String addTeamMember(){
        //request body에서 team_id와 member_id를 받는다.
        //team_id가 있는지 확인
        //member_id가 회원인지 확인
        //회원이면 TeamUser에 멤버추가
        return null;
    }
    @DeleteMapping("/{team_id}/{member_id}")
    public String deleteTeamMember(){
        //team_id와 member_id가 숫자인지 확인
        //팀이 존재하는지 확인
        //팀에 멤버가 존재하는지 확인
        //위 조건을 만족한다면 팀목록에서 멤버 삭제(TeamUser에서 해당 row삭제)
        return null;
    }

    private boolean isNumber(String value){
        return value.chars().allMatch(Character::isDigit);
    }
}
