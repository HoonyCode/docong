package com.b5f1.docong.core.repository;

import com.b5f1.docong.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmailAndActivateTrue(String email); //jpa query method
}
