package com.b5f1.docong.core.domain.group;

import com.b5f1.docong.core.domain.BaseEntity;
import com.b5f1.docong.core.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "TeamUser")
@IdClass(TeamUserId.class)
public class TeamUser extends BaseEntity implements Serializable {
    @Id
    @Column(name = "team_seq")
    private Long teamSeq;

    @Id
    @Column(name = "user_seq")
    private Long userSeq;

    @ManyToOne(targetEntity = Team.class, fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "team_seq")
    private Team team;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "leader")
    private boolean leader;
}
