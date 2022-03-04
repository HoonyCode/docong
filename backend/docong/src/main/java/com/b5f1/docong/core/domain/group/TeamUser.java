package com.b5f1.docong.core.domain.group;

import com.b5f1.docong.core.domain.BaseEntity;
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

    @ManyToOne(targetEntity = Team.class, fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "team_seq")
    private Team team;

//    @Id
//    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_seq")
//    private User user;

    @Column(name = "leader")
    private boolean leader;
}
