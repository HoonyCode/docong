package com.b5f1.docong.core.domain.group;

import com.b5f1.docong.core.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TeamUser")
@IdClass(TeamUserId.class)
public class TeamUser extends BaseEntity implements Serializable {
    @Id
    @ManyToOne(targetEntity = Team.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "team_seq")
    private Long teamSeq;

//    @Id
//    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_seq")
//    private User user;

    @Column(name = "leader")
    private boolean leader;
}
