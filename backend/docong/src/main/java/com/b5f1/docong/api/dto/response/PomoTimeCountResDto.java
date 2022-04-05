package com.b5f1.docong.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PomoTimeCountResDto {
    Integer hour;
    Double cnt;
}
