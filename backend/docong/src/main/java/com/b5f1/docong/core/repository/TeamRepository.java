package com.b5f1.docong.core.repository;

import com.b5f1.docong.core.domain.group.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface TeamRepository extends JpaRepository<Team, Long> {
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Team t SET t.name = :name, t.modifiedDate = :now WHERE t.seq = :seq")
    int updateTeamName(LocalDateTime now, String name, Long seq);
}
