package com.b5f1.docong.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FindMemberActivateResDto {
    String userEmail;
    String userImg;
    String userName;
    Boolean online;
}
