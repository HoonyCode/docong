package com.b5f1.docong.core.repository;


import com.b5f1.docong.core.domain.group.TeamUser;
import com.b5f1.docong.core.domain.group.TeamUserId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamUserRepository extends JpaRepository<TeamUser, TeamUserId> {
}
