package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.PomoDayCountResDto;
import com.b5f1.docong.api.dto.response.PomoTimeCountResDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnalysisService2 {


    PomoDayCountResDto findPomoCountByUserSolo(Long userSeq);

    PomoDayCountResDto findPomoCountByUserGroup(Long userSeq, Long groupSeq);


    List<PomoTimeCountResDto> findTimeCountByUserSolo(Long userSeq);

    List<PomoTimeCountResDto> findTimeCountByUserGroup(Long userSeq, Long groupSeq);

}
