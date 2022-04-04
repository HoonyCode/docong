package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveTeamReqDto;
import com.b5f1.docong.api.dto.request.SaveAndDeleteTeamUserReqDto;
import com.b5f1.docong.api.dto.request.UpdateTeamReqDto;
import com.b5f1.docong.api.dto.response.FindMemberActivateResDto;
import com.b5f1.docong.api.dto.response.FindTeamResDto;

import java.util.List;

public interface TeamService {
    Long updateTeam(UpdateTeamReqDto teamReqDto);
    Long createTeam(SaveTeamReqDto teamReqDto);
    void deleteTeam(Long team_id);
    FindTeamResDto findTeam(Long team_id);
    List<FindTeamResDto> findAllTeam(Long user_id);
    void addTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto, Long reqUserId);
    void deleteTeamMember(SaveAndDeleteTeamUserReqDto teamUserReqDto, Long reqUserId);
//    List<FindMemberActivateResDto> findMemberWithActivate(Long team_id);
}
