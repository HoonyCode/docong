package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.SaveAndDeleteTeamUserReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.api.dto.response.FindAllTeamResDto;
import com.b5f1.docong.api.dto.response.FindTeamResDto;

public interface TeamService {
    Long updateTeam(UpdateTeamReqDto teamReqDto);
    Long createTeam(SaveTeamReqDto teamReqDto);
    void deleteTeam(Long team_id);
    FindTeamResDto findTeam(Long team_id);
    FindAllTeamResDto findAllTeam(Long user_id);
    void addTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto, Long reqUserId);
    void deleteTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto, Long reqUserId);
}
