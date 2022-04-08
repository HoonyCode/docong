package com.b5f1.docong.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveJiraInfoReqDto {
    String jiraDomain;
    String jiraUserId;
    String jiraAPIToken;
    String jiraProjectKey;
}
