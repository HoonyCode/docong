package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveJiraInfoReqDto;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional
class JiraServiceTest {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JiraService jiraService;

    @BeforeEach
    void before() {
        createUser();
        createTeam();
    }

    private Team savedTeam;

    private User savedUser;

    @Test
    public void saveTeamJiraTest() throws Exception {
        Long seq = savedTeam.getSeq();
        Long userSeq = savedUser.getSeq();
        SaveJiraInfoReqDto reqDto = new SaveJiraInfoReqDto("https://hyunse0.atlassian.net/", "hhs28166139@gmail.com", "jlDdT1ysSdcNME0VJ2FP1FBF", "TEST");

        jiraService.saveTeamJira(seq, userSeq, reqDto);

        Team team = teamRepository.findById(seq)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        assertThat(team.getJiraDomain()).isEqualTo("https://hyunse0.atlassian.net/");
        assertThat(team.getJiraUserId()).isEqualTo("hhs28166139@gmail.com");
        assertThat(team.getJiraProjectKey()).isEqualTo("TEST");
    }

//    @Test
    public void saveIssueTest() throws Exception {
        Long seq = savedTeam.getSeq();
        Long userSeq = savedUser.getSeq();
        SaveJiraInfoReqDto reqDto = new SaveJiraInfoReqDto("https://hyunse0.atlassian.net/", "hhs28166139@gmail.com", "jlDdT1ysSdcNME0VJ2FP1FBF", "TEST");

        jiraService.saveTeamJira(seq, userSeq, reqDto);

        ArrayList<String> issueIds = jiraService.saveIssue(seq, userSeq);

        for (String issueId: issueIds) {
            Todo todo = todoRepository.findByJiraIssueId(issueId);
            assertThat(todo.getTeam().getSeq()).isEqualTo(seq);
        }
    }

    @Test
    public void encodingTest() throws Exception {
        String token = "jlDdT1ysSdcNME0VJ2FP1FBF";

        String encodeToken = jiraService.encrypt(token.getBytes());

        String decodeToken = jiraService.decrypt(encodeToken.getBytes());

        assertThat(decodeToken).isEqualTo(token);
    }

    private void createUser() {
        User user = User.builder()
                .email("gustj@docong.com")
                .password("1234")
                .activate(true)
                .build();
        savedUser = userRepository.save(user);
    }

    private void createTeam() {
        Team team = Team.builder()
                .name("Test-Team")
                .build();
        savedTeam = teamRepository.save(team);
    }
}