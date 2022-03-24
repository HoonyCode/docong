package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.request.SaveJiraInfoReqDto;
import com.b5f1.docong.api.dto.response.BaseResponseEntity;
import com.b5f1.docong.api.resolver.Auth;
import com.b5f1.docong.api.service.JiraService;
import com.b5f1.docong.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/jira")
@RequiredArgsConstructor
public class JiraController {

    private final JiraService jiraService;

    @PostMapping("/{id}")
    public ResponseEntity<BaseResponseEntity> saveTeamJira(@Auth User user,
                                                           @PathVariable Long id,
                                                           @RequestBody @Valid SaveJiraInfoReqDto reqDto) {
        jiraService.saveTeamJira(id, user.getSeq(), reqDto);
        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponseEntity> saveIssue(@Auth User user,
                                                        @PathVariable Long id) {
        jiraService.saveIssue(id, user.getSeq());
        return ResponseEntity.status(200).body(new BaseResponseEntity(200, "Success"));
    }
}