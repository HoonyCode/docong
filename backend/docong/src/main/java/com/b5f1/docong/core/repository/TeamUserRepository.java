package com.b5f1.docong.core.repository;


import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamUserRepository extends JpaRepository<TeamUser, Long> {
    List<TeamUser> findAllByTeam(Long team_id);
}
