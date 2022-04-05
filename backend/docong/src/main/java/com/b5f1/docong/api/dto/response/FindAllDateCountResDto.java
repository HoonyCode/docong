package com.b5f1.docong.api.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Data
@ToString
@NoArgsConstructor
public class FindAllDateCountResDto {

    private LocalDate localDate;
    private Double count;

    @QueryProjection
    public FindAllDateCountResDto(String localDate, Double count) {
        this.localDate = LocalDate.parse(localDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        this.count = count;
    }

    public Map<LocalDate, FindAllDateCountResDto> MakeDate(int year) {
        Map<LocalDate, FindAllDateCountResDto> map = new HashMap<>();
        for (int i = 0; i < 12; i++) {
            int dayOfMonth = new GregorianCalendar(year, i, 1).getActualMaximum(Calendar.DAY_OF_MONTH);

            for (int j = 1; j <= dayOfMonth; j++) {
                FindAllDateCountResDto findAllDateCountResDto = new FindAllDateCountResDto(String.format("%d-%02d-%02d", year, i + 1, j), 0d);
                map.put(findAllDateCountResDto.localDate, findAllDateCountResDto);
            }
        }

        return map;
    }

}
