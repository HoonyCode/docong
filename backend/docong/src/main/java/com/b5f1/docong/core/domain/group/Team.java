package com.b5f1.docong.core.domain.group;

import com.b5f1.docong.core.domain.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Team")
public class Team extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @Column
    private String name;

    @Column
    private String jiraDomain;

    @Column
    private String jiraUserId;

    @Column
    private String jiraAPIToken;

    @Column
    private String jiraProjectKey;

    public void changeName(String name){
        this.name = name;
    }

    public void changeJiraInfo(String jiraDomain, String jiraUserId, String jiraAPIToken, String jiraProjectKey) {
        this.jiraDomain = jiraDomain;
        this.jiraUserId = jiraUserId;
        this.jiraAPIToken = jiraAPIToken;
        this.jiraProjectKey = jiraProjectKey;
    }
}
