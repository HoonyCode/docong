package com.b5f1.docong.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FindPomoTimeResDto {
    Integer singlePomoCount;
    List<FindPomoByGruopResDto> teamPomoCount;
    Integer totalPomoCount;
}
