package com.b5f1.docong.api.controller;

import com.b5f1.docong.api.dto.response.FindAllDateCountResDto;
import com.b5f1.docong.api.dto.response.PomoDayCountResDto;
import com.b5f1.docong.api.dto.response.PomoTimeCountResDto;
import com.b5f1.docong.api.resolver.Auth;
import com.b5f1.docong.api.service.AnalysisService2;
import com.b5f1.docong.core.domain.user.User;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/analysis")
@RequiredArgsConstructor
public class AnalysisController2 {
    final AnalysisService2 analysisService2;


    @GetMapping("/count")
    ResponseEntity<PomoDayCountResDto> findDayCountSolo(@Auth User user){
        PomoDayCountResDto response = analysisService2.findPomoCountByUserSolo(user.getSeq());
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/count/{group}")
    ResponseEntity<PomoDayCountResDto> findDayCountGroup(@Auth User user,@PathVariable Long groupSeq){
        PomoDayCountResDto response = analysisService2.findPomoCountByUserGroup(user.getSeq(),groupSeq);
        return ResponseEntity.status(200).body(response);
    }



    @GetMapping("/time")
    ResponseEntity<List<PomoTimeCountResDto>> findTimeCountSolo(@Auth User user){
        List<PomoTimeCountResDto> response = analysisService2.findTimeCountByUserSolo(user.getSeq());
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/time/{group}")
    ResponseEntity<List<PomoTimeCountResDto>> findTimeCountGroup(@Auth User user,@PathVariable Long groupSeq){
        List<PomoTimeCountResDto> response = analysisService2.findTimeCountByUserGroup(user.getSeq(), groupSeq);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/date/{year}")
    ResponseEntity<List<FindAllDateCountResDto>> findAllDateCount(@Auth User user, @PathVariable Integer year){
        List<FindAllDateCountResDto> response = analysisService2.findAllDateCountByUser(user.getSeq(), year);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/date/{year}/{groupSeq}")
    ResponseEntity<List<FindAllDateCountResDto>> findAllDateCount(@PathVariable Integer year, @PathVariable Long groupSeq){
        List<FindAllDateCountResDto> response = analysisService2.findAllDateCountByGroup(groupSeq, year);
        return ResponseEntity.status(200).body(response);
    }
}
