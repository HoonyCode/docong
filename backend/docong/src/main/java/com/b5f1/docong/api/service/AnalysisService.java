package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.*;
import com.b5f1.docong.core.domain.user.User;

import java.util.List;

public interface AnalysisService {
    List<FindRankingResDto> findPomoRanking();

    List<FindWorktypeAnalysisResDto> findWorktypeAnalysis(User user);

    PomoDayCountResDto findPomoCountByUserSolo(Long userSeq);

    PomoDayCountResDto findPomoCountByUserGroup(Long userSeq, Long groupSeq);

    List<PomoTimeCountResDto> findTimeCountByUserSolo(Long userSeq);

    List<PomoTimeCountResDto> findTimeCountByGroup(Long groupSeq);

    List<FindAllDateCountResDto> findAllDateCountByUser(Long userSeq, int year);

    List<FindAllDateCountResDto> findAllDateCountByGroup(Long groupSeq, int year);

    FindPomoTimeResDto findPomoTime(Long id);

    List<FindGroupRankingResDto> findGroupRanking(Long team_id);
}
