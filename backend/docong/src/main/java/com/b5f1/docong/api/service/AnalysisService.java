package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.FindRankingResDto;

import java.util.List;

public interface AnalysisService {
    List<FindRankingResDto> findPomoRanking();
}
