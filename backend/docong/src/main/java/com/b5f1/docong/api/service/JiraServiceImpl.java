package com.b5f1.docong.api.service;

import com.b5f1.docong.api.dto.request.SaveJiraInfoReqDto;
import com.b5f1.docong.api.dto.request.SaveTodoReqDto;
import com.b5f1.docong.api.exception.CustomException;
import com.b5f1.docong.api.exception.ErrorCode;
import com.b5f1.docong.core.domain.group.Team;
import com.b5f1.docong.core.domain.todo.Todo;
import com.b5f1.docong.core.domain.user.User;
import com.b5f1.docong.core.repository.TeamRepository;
import com.b5f1.docong.core.repository.TodoRepository;
import com.b5f1.docong.core.repository.UserRepository;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class JiraServiceImpl implements JiraService{

    private final TeamRepository teamRepository;
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;
    private final TodoService todoService;

    @Value("${encrypt.keyString}")
    private String keyString;

    @Override
    public void saveTeamJira(Long id, Long userId, SaveJiraInfoReqDto reqDto) {
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        String encryptKey = encrypt(reqDto.getJiraAPIToken().getBytes());

        team.changeJiraInfo(reqDto.getJiraDomain(), reqDto.getJiraUserId(), encryptKey, reqDto.getJiraProjectKey());
    }

    @Override
    public ArrayList<String> saveIssue(Long id, Long userId) {
        // user 정보 가져오기
        Optional<User> user = userRepository.findById(userId);
        String userEmail = user.get().getEmail();

        // team jira 정보 가져오기
        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        String domain = team.getJiraDomain();
        String userID = team.getJiraUserId();
        String getAPIToken = team.getJiraAPIToken();
        String apiToken = decrypt(getAPIToken.getBytes());
        String projectKey = team.getJiraProjectKey();

        // 모든 이슈 가져오기
        HttpResponse<JsonNode> issueResponse = null;
        try {
            issueResponse = Unirest.get(domain + "rest/api/3/search")
                    .basicAuth(userID, apiToken)
                    .header("Accept", "application/json")
                    .queryString("jql", String.format("project = %s", projectKey))
                    .asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }

        Integer cnt = new JSONObject(issueResponse.getBody()).getJSONArray("array")
                .getJSONObject(0)
                .getInt("total");

        JSONArray issues = new JSONObject(issueResponse.getBody()).getJSONArray("array")
                .getJSONObject(0)
                .getJSONArray("issues");

        // 개별 이슈 정보
        ArrayList<String> issueIds = new ArrayList<String>();

        for (int i = 0; i < cnt; ++i) {
            JSONObject issue = issues.getJSONObject(i);

            String title = issue.getJSONObject("fields")
                    .getString("summary");

            String content = issue.getJSONObject("fields")
                    .getJSONObject("description")
                    .getJSONArray("content")
                    .getJSONObject(0)
                    .getJSONArray("content")
                    .getJSONObject(0)
                    .getString("text");

            // Todo: "해야 할 일", Inprogress: "진행 중", Done: "완료됨"
            String status = issue.getJSONObject("fields")
                    .getJSONObject("status")
                    .getString("name");

            String issueId = issue.getString("id");

            // 상태가 todo이고 isuueId가 없을 경우에만 저장
            if (status.equals("해야 할 일") && !findIssue(issueId)) {
                SaveTodoReqDto todoReqDto = new SaveTodoReqDto(title, content, id, userEmail, null, null, null, null);

                Long todoSeq = todoService.saveTodo(todoReqDto);

                Todo todo = todoRepository.findById(todoSeq)
                        .orElseThrow(() -> new CustomException(ErrorCode.TODO_NOT_FOUND));

                todo.changeJiraIssueId(issueId);
                issueIds.add(issueId);
                System.out.println("저장Todo" + title + content + status);
            }
        }
        return issueIds;
    }

    @Override
    public Boolean findIssue(String jiraIssueId) {
        Todo todo = todoRepository.findByJiraIssueId(jiraIssueId);

        if (todo != null) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public String encrypt(byte[] APIToken) {
        byte[] key = getKey();
        SecretKeySpec keySpec = new SecretKeySpec(key, "AES");

        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("AES");
        } catch (NoSuchAlgorithmException e) {
            return null;
        } catch (NoSuchPaddingException e) {
            return null;
        }

        try {
            cipher.init(Cipher.ENCRYPT_MODE, keySpec);
        } catch (InvalidKeyException e) {
            return null;
        }

        try {
            Encoder encoder = Base64.getEncoder();
            return new String(encoder.encode(cipher.doFinal(APIToken)));
        } catch (IllegalBlockSizeException e) {

        } catch (BadPaddingException e) {

        }
        return null;
    }

    @Override
    public String decrypt(byte[] APIToken) {
        byte[] key = getKey();
        SecretKeySpec keySpec = new SecretKeySpec(key, "AES");

        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("AES");
        } catch (NoSuchAlgorithmException e) {
            return null;
        } catch (NoSuchPaddingException e) {
            return null;
        }

        try {
            cipher.init(Cipher.DECRYPT_MODE, keySpec);
        } catch (InvalidKeyException e) {
            return null;
        }

        try {
            Decoder encoder = Base64.getDecoder();
            return new String(cipher.doFinal(encoder.decode(APIToken)));
        } catch (IllegalBlockSizeException e) {
            System.out.println("err");
        } catch (BadPaddingException e) {

        }
        return null;
    }

    private byte[] getKey() {
        return keyString.getBytes();
    }
}