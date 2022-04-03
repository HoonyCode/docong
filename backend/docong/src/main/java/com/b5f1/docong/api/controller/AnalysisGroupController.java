package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.response.FindGroupRankingResDto;
import com.b5f1.docong.api.dto.response.FindPomoTimeResDto;
import com.b5f1.docong.api.resolver.Auth;
import com.b5f1.docong.api.service.AnalysisGroupService;
import com.b5f1.docong.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/analysis")
@RequiredArgsConstructor
public class AnalysisGroupController {

    private final AnalysisGroupService analysisGroupService;

    @GetMapping("/pomotime")
    public ResponseEntity<FindPomoTimeResDto> findPomoTime(@Auth User user) {
        FindPomoTimeResDto responce = analysisGroupService.findPomoTime(user.getSeq());
        return ResponseEntity.status(200).body(responce);
    }

    @GetMapping("/groupRanking/{team_id}")
    public ResponseEntity<List<FindGroupRankingResDto>> findGroupRanking(@PathVariable Long team_id) {
        List<FindGroupRankingResDto> responce = analysisGroupService.findGroupRanking(team_id);
        return ResponseEntity.status(200).body(responce);
    }
}
