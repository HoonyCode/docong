package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.FindGroupRankingResDto;
import com.b5f1.docong.api.dto.response.FindPomoTimeResDto;

import java.util.List;

public interface AnalysisGroupService {
    FindPomoTimeResDto findPomoTime(Long id);
    List<FindGroupRankingResDto> findGroupRanking(Long team_id);
}
