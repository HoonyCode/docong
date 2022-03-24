package com.b5f1.docong.core.domain.user;

import com.b5f1.docong.api.dto.request.UserInfoReqDto;
import com.b5f1.docong.core.domain.todo.UserTodo;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USER")
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long seq;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String birth;

    @Column
    private String gender;

    @Column
    private String mbti;

    @Column
    private String job;

    @Column
    private String position;

    @Column
    private boolean activate;

    @Column
    private String oauth_type;

    @Column
    private String refresh_token;

    @Column
    private String image;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserTodo> userTodos = new ArrayList<>();

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<TeamUser> teamUsers = new ArrayList<>();

    @Builder
    public User(String email, String password, String name, String birth,
                String gender, String mbti, String job, String position, boolean activate, String oauth_type, String image) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.birth = birth;
        this.gender = gender;
        this.mbti = mbti;
        this.job = job;
        this.position = position;
        this.activate = activate;
        this.oauth_type = oauth_type;
        this.image = image;
    }

    public void addUserTodo(UserTodo userTodo) {
        userTodos.add(userTodo);
        userTodo.changeUser(this);
    }
    // 여기서부터 추가

    public void updateUserInfo(UserInfoReqDto userInfoReqDto) {
        this.name = userInfoReqDto.getName();
        this.birth = userInfoReqDto.getBirth();
        this.gender = userInfoReqDto.getGender();
        this.mbti = userInfoReqDto.getMbti();
        this.job = userInfoReqDto.getJob();
        this.position = userInfoReqDto.getPosition();
    }

    public void deleteUser() {
        this.activate = false;
        this.email = "deleteUser";
    }

    public void saveRefreshToken(String refresh_token) {
        this.refresh_token = refresh_token;
    }
}
