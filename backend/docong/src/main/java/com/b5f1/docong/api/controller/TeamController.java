package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.SaveAndDeleteTeamUserReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.api.dto.response.*;
import com.b5f1.docong.api.resolver.Auth;
import com.b5f1.docong.api.service.TeamServiceImpl;
import com.b5f1.docong.api.service.TodoServiceImpl;
import com.b5f1.docong.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/team")
@RequiredArgsConstructor
public class TeamController {
    //    private final UserRepository userRepository;
    private final TeamServiceImpl teamService;
    private final TodoServiceImpl todoService;


    @PostMapping
    public ResponseEntity<Long> createTeam(@Auth User user, @RequestBody @Validated SaveTeamReqDto teamReqDto) {
        System.out.println("teamReqDto.getName() = " + teamReqDto.getName());
        Long result = teamService.createTeam(teamReqDto);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping
    public ResponseEntity<Long> updateTeam(@Auth User user, @RequestBody @Validated UpdateTeamReqDto teamReqDto) {
        Long result = teamService.updateTeam(teamReqDto);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/{team_id}")
    public ResponseEntity<FindTeamResDto> findTeam(@Auth User user, @PathVariable Long team_id) {
        FindTeamResDto teamResDto = teamService.findTeam(team_id);
        return ResponseEntity.ok().body(teamResDto);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FindTeamResDto>> findAllTeam(@Auth User user) {
        //해당 유저 모든 team list반환
        List<FindTeamResDto> teamResDtoList = teamService.findAllTeam(user.getSeq());
        return ResponseEntity.ok().body(teamResDtoList);
    }

//    @GetMapping("/activate/{team_id}")
//    public ResponseEntity<List<FindMemberActivateResDto>> findMemberWithActivate(@PathVariable Long team_id) {
//        List<FindMemberActivateResDto> response = teamService.findMemberWithActivate(team_id);
//        return ResponseEntity.ok().body(response);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponseEntity> deleteTeam(@Auth User user, @PathVariable Long id) {
        List<FindTodoResDto> groupTodos = todoService.findGroupTodos(id);
        groupTodos.stream().forEach(groupTodo -> todoService.deleteTodo(groupTodo.getSeq()));
        teamService.deleteTeam(id);
        return ResponseEntity.ok().body(new BaseResponseEntity(200,"Success"));
    }

    @PostMapping("/member")
    public ResponseEntity<BaseResponseEntity> addTeamMember(@RequestBody @Validated SaveAndDeleteTeamUserReqDto teamUserReqDto, @Auth User user) {
//        SaveAndDeleteTeamUserReqDto teamUserReqDto = new SaveAndDeleteTeamUserReqDto(teamMemberDto.getTeamId(), teamMemberDto.getUserId(), user.getSeq());
        teamService.addTeamMember(teamUserReqDto,user.getSeq());
        return ResponseEntity.ok().body(new BaseResponseEntity(200,"Success"));
    }

    @DeleteMapping("member/{team_id}/{user_email}")
    public ResponseEntity<BaseResponseEntity> deleteTeamMember(@PathVariable Long team_id, @PathVariable String user_email, @Auth User user) {
        SaveAndDeleteTeamUserReqDto teamUserReqDto = new SaveAndDeleteTeamUserReqDto(team_id, user_email);
        teamService.deleteTeamMember(teamUserReqDto,user.getSeq());
        return ResponseEntity.ok().body(new BaseResponseEntity(200,"Success"));
    }


}
