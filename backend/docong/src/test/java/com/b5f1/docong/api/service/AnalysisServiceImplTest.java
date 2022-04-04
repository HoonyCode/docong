package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.FindAllDateCountResDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;


@SpringBootTest
class AnalysisServiceImplTest {

    @Autowired
    AnalysisService analysisService;

    @Test
    void 년도로뽀모가져오기(){
        List<FindAllDateCountResDto> result = analysisService.findAllDateCountByUser(70L, 2022);
        Assertions.assertThat(result.get(result.size()-1).getCount().equals(0));
    }

}