package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.response.FindRankingResDto;
import com.b5f1.docong.api.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisService analysisService;

    @GetMapping("/ranking")
    ResponseEntity<List<FindRankingResDto>> findRanking(){
        List<FindRankingResDto> response = analysisService.findPomoRanking();
        return ResponseEntity.status(200).body(response);
    }
}
