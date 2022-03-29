package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.response.FindRankingResDto;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class AnalysisServiceImpl implements AnalysisService{

    private final UserRepository userRepository;

    @Override
    public List<FindRankingResDto> findPomoRanking() {
        List<User> users = userRepository.findAllByActivateTrue();
        List<FindRankingResDto> response = new ArrayList<>();
        for(User u : users){
            response.add(new FindRankingResDto(u.getName(), u.getEmail(), u.getRealPomo()));
        }
        Collections.sort(response, new Comparator<FindRankingResDto>() {
            @Override
            public int compare(FindRankingResDto o1, FindRankingResDto o2) {
                return -Integer.compare(o1.getPomoCount(), o2.getPomoCount());
            }
        });
        if(response.size() >= 20) return response.subList(0, 20);
        return response;
    }
}
