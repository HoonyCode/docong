package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.response.*;
import com.b5f1.docong.api.resolver.Auth;
import com.b5f1.docong.api.service.AnalysisService;
import com.b5f1.docong.core.domain.user.User;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = {"시각화"})
@RestController
@RequestMapping(value = "/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisService analysisService;

    @GetMapping("/ranking")
    ResponseEntity<List<FindRankingResDto>> findRanking() {
        List<FindRankingResDto> response = analysisService.findPomoRanking();
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/worktype")
    ResponseEntity<List<FindWorktypeAnalysisResDto>> findWorkType(@Auth User user) {
        List<FindWorktypeAnalysisResDto> response = analysisService.findWorktypeAnalysis(user);
        return ResponseEntity.status(200).body(response);
    }


    @GetMapping("/count")
    ResponseEntity<PomoDayCountResDto> findDayCountSolo(@Auth User user) {
        PomoDayCountResDto response = analysisService.findPomoCountByUserSolo(user.getSeq());
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/count/{group}")
    ResponseEntity<PomoDayCountResDto> findDayCountGroup(@Auth User user, @PathVariable("group") Long groupSeq) {
        PomoDayCountResDto response = analysisService.findPomoCountByUserGroup(user.getSeq(), groupSeq);
        return ResponseEntity.status(200).body(response);
    }


    @GetMapping("/time")
    ResponseEntity<List<PomoTimeCountResDto>> findTimeCountSolo(@Auth User user) {
        List<PomoTimeCountResDto> response = analysisService.findTimeCountByUserSolo(user.getSeq());
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/time/{group}")
    ResponseEntity<List<PomoTimeCountResDto>> findTimeCountGroup(@Auth User user, @PathVariable("group") Long groupSeq) {
        List<PomoTimeCountResDto> response = analysisService.findTimeCountByUserGroup(user.getSeq(), groupSeq);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/date/{year}")
    ResponseEntity<List<FindAllDateCountResDto>> findAllDateCount(@Auth User user, @PathVariable Integer year) {
        List<FindAllDateCountResDto> response = analysisService.findAllDateCountByUser(user.getSeq(), year);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/date/{year}/{group}")
    ResponseEntity<List<FindAllDateCountResDto>> findAllDateCount(@PathVariable Integer year, @PathVariable("group") Long groupSeq) {
        List<FindAllDateCountResDto> response = analysisService.findAllDateCountByGroup(groupSeq, year);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/pomotime")
    public ResponseEntity<FindPomoTimeResDto> findPomoTime(@Auth User user) {
        FindPomoTimeResDto responce = analysisService.findPomoTime(user.getSeq());
        return ResponseEntity.status(200).body(responce);
    }

    @GetMapping("/groupRanking/{team_id}")
    public ResponseEntity<List<FindGroupRankingResDto>> findGroupRanking(@PathVariable Long team_id) {
        List<FindGroupRankingResDto> responce = analysisService.findGroupRanking(team_id);
        return ResponseEntity.status(200).body(responce);
    }
}
