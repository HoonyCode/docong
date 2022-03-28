package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.FindRankingResDto;
import com.b5f1.docong.core.queryrepository.AnalysisQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AnalysisServiceImpl implements AnalysisService{

    private final AnalysisQueryRepository analysisQueryRepository;

    @Override
    public List<FindRankingResDto> findPomoRanking() {
        return analysisQueryRepository.findPomoRanking();
    }
}
