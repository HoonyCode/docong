package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SaveJiraInfoReqDto {
    String jiraDomain;
    String jiraUserId;
    String jiraAPIToken;
    String jiraProjectKey;
}
