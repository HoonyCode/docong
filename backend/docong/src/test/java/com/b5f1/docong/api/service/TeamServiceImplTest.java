package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.*;
import com.b5f1.docong.api.dto.response.FindMemberActivateResDto;
import com.b5f1.docong.api.dto.response.FindTeamResDto;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.todo.UserTodo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.queryrepository.TeamUserQueryRepositoryImpl;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TeamUserRepository;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


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
    @Autowired
    private TodoRepository todoRepository;

    @Test
    void saveTest(){
        //given
        User findUser = joinUser("teat1");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getEmail(), "saveTest");
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
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getEmail(), "findTeamTest");
        //when
        Long seq = teamService.createTeam(teamReqDto);
        FindTeamResDto teamResDto = teamService.findTeam(seq);
        Long teamId = teamResDto.getTeamSeq();
        Long userCount = teamResDto.getUserList().stream().count();
        User leader = userRepository.findByEmailAndActivateTrue(teamResDto.getLeaderEmail());
        //then
        assertThat(teamId).isEqualTo(seq);
        assertThat(userCount).isEqualTo(1);
        assertThat(leader.getSeq()).isEqualTo(findUser.getSeq());
    }

    @Test
    void findActivateTest(){
        //given
        User findUser = joinUser("teat1");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getEmail(), "findTeamTest");
        Long seq = teamService.createTeam(teamReqDto);
        Todo todo = Todo.builder().title("hi").content("HI").build();;
        UserTodo userTodo = UserTodo.builder().todo(todo).user(findUser).build();
        todo.addUserTodo(userTodo);
        Todo savedTodo = todoRepository.save(todo);
        savedTodo.changeActivation(true);

        //when
        List<FindMemberActivateResDto> response = teamService.findMemberWithActivate(seq);

        //then
        assertThat(response.get(0).getOnline()).isEqualTo(true);
    }

    @Test
    void updateTest(){
        //given
        User findUser = joinUser("teat1");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getEmail(), "updateTeamTest");
        Long seq = teamService.createTeam(teamReqDto);
        //when
        Optional<Team> save = teamRepository.findById(seq);
        UpdateTeamReqDto updateTeamReqDto = new UpdateTeamReqDto(save.get().getSeq(),findUser.getEmail(),"changedTeamName");
        Long result = teamService.updateTeam(updateTeamReqDto);
        Optional<Team> findTeam = teamRepository.findById(save.get().getSeq());
        //then
        assertThat(findTeam.get().getName()).isEqualTo("changedTeamName");
    }

    @Test
    void deleteTest(){
        //given
        User findUser = joinUser("teat1");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser.getEmail(), "deleteTeamTest");
        Long seq = teamService.createTeam(teamReqDto);
        //when
        teamService.deleteTeam(seq);
        Optional<Team> find = teamRepository.findById(seq);
        List<TeamUser> teamUsers = teamUserRepository.findAll();
        long count = teamUsers
                .stream()
                .filter(teamUser -> teamUser.getTeam().getSeq() == seq)
                .count();
        //then
        assertThat(find.isPresent()).isEqualTo(false);
        assertThat(count).isEqualTo(0);
    }

    @Test
    void addTeamMemberTest(){
        //given
        User findUser1 = joinUser("teat1");
        User findUser2 = joinUser("teat2");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser1.getEmail(), "addTeamMemberTest");
        Long seq = teamService.createTeam(teamReqDto);
        //when
        SaveAndDeleteTeamUserReqDto teamUserReqDto = new SaveAndDeleteTeamUserReqDto(seq, findUser2.getEmail());
        teamService.addTeamMember(teamUserReqDto,findUser1.getSeq());
        List<TeamUser> teamUsers = teamUserQueryRepository.findTeamUserWithTeamId(seq);
        //then
        assertThat(teamUsers.size()).isEqualTo(2);

    }

    @Test
    void deleteTeamMemberTest(){
        //given
        User findUser1 = joinUser("teat1");
        User findUser2 = joinUser("teat2");
        SaveTeamReqDto teamReqDto = new SaveTeamReqDto(findUser1.getEmail(), "deleteTeamMemberTest");
        Long seq = teamService.createTeam(teamReqDto);
        SaveAndDeleteTeamUserReqDto teamUserReqDto = new SaveAndDeleteTeamUserReqDto(seq, findUser2.getEmail());
        teamService.addTeamMember(teamUserReqDto,findUser1.getSeq());
        teamService.deleteTeamMember(teamUserReqDto,findUser1.getSeq());
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
        user.setMbti("ENFJ");
        user.setJob("student");
        user.setPosition("student");
        userService.join(user);
        return userRepository.findByEmailAndActivateTrue(email+"@naver.com");
    }
}