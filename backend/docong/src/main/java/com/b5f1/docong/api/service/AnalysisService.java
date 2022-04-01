package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.FindRankingResDto;
import com.b5f1.docong.api.dto.response.FindWorktypeAnalysisResDto;
import com.b5f1.docong.core.domain.user.User;

import java.util.List;

public interface AnalysisService {
    List<FindRankingResDto> findPomoRanking();
    List<FindWorktypeAnalysisResDto> findWorktypeAnalysis(User user);
}
