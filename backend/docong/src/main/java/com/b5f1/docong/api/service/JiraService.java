package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveJiraInfoReqDto;

import java.util.ArrayList;

public interface JiraService {
    void saveTeamJira(Long id, Long userId, SaveJiraInfoReqDto reqDto);
    ArrayList<String> saveIssue(Long id, Long userId);
    Boolean findIssue(String jiraIssueId);
    String encrypt(byte[] APIToken);
    String decrypt(byte[] APIToken);
}