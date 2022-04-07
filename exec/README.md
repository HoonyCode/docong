# 📚 준비하기

1. Git clone 받기

```bash
git clone https://lab.ssafy.com/s06-s-project/S06P21S003.git
```



2. 데이터 베이스 준비

- Mariadb 다운로드 [바로가기](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.6.7&os=windows&cpu=x86_64&pkg=msi&m=harukasan)

<img width="1000" alt="image" src="https://user-images.githubusercontent.com/44612896/162108219-c211e1f0-d880-44a4-99f2-e3790ef143c1.png">

- 사용자의 운영체제에 맞추어 다운로드



3. **Backend** application.properties 설정

```xml
# 로컬에서 사용할 application yml 설정 파일
# ':' 뒤에 설정값을 입력할 때는 반드시 ':' 다음에 공백이 필요
# 설정할 값들의 레벨 주의 (ex. spring.datasource.url 을 입력할 경우, datasource: 는 spring: 보다 우측으로 한 탭 이동. url: 은 datasource: 보다 우측으로 한 탭 이동)

# 기본 로그 레벨 설정
logging:
  level:
    root: info
    com.ssapy.api: debug
    org.hibernate.type.descriptor.sql: trace   # trace

spring:
  profiles:
    # application-aws.yml 추가 include
    include:
      - aws
  messages:
    basename: i18n/exception
    encoding: UTF-8
  # JWT 토큰에 사용할 secret 키값 (임의의 랜덤 키값)
  jwt:
    secret: DvqcGn8mnFjqSL4a
  # JPA 기본 설정
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    properties.hibernate:
      # 재시작 시 JPA Entity(DB 테이블 데이터)를 새로 생성할지 여부 (create:기존데이터 삭제 후 신규 생성, udpate:신규 데이터만 업데이트, none:아무 실행도 하지 않음)
      hbm2ddl.auto: update
      format_sql: true
      show_sql: true
      use_sql_comments: true
    generate-ddl: true
    open-in-view: false
  freemarker:
    checkTemplateLocation: false

  # 데이터 베이스 연결 설정
  datasource:
		#데이터베이스 주소 이름
    url: jdbc:mariadb://데이터베이스주소:포트번호/데이터베이스이름?characterEncoding=utf-8&createDatabaseIfNotExist=true 
    driver-class-name: org.mariadb.jdbc.Driver
    username: #아이디
    password: #패스워드
  flyway:
    enabled: false
  config:
    activate:
      on-profile: local
    use-legacy-processing: true
  servlet:
    multipart:
      file-size-threshold: 15MB
      # 프로젝트 환경의 upload 파일을 저장할 경로
      location: C:\Develop\projects\ssafy\upload
      max-file-size: 100MB
      max-request-size: 100MB

  # 메일 전송 시 사용할 설정값
  mail:
    host: smtp.gmail.com
    port: 587
    username:  #이메일 주소
    to-name:  #이메일 주소
    #docong1234!
    password:  #비밀번호
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true

server:
  # 프로젝트 환경의 포트 설정
  port: 8080 # 포트 수정 필요
  domain: http:127.0.0.1
  servlet:
    session:
      timeout: 43200m      # 60m * 24h * 30d
      cookie:
        max-age: 43200m    # 60m * 24h * 30d
        name: SID
        http-only: true
        secure: true
    context-path: /api
  max-http-header-size: 3145728

aes256:
  key: WZsExuBV3GSQ55Uf

# 푸쉬 알림 전송 시 필요한 firebase json 파일의 위치
app:
  firebase-config: ssafy-e6f74-firebase-adminsdk-2911y-cfd0f23f96.json

# swagger에서 테스트 할 때의 host
swagger:
  host: http://localhost:8080

# notification 부분
notification:
  mattermost:
    enabled: true # mmSender를 사용할 지 여부, false면 알림이 오지 않는다
    webhook-url: # Webhook URL을 기입
    channel: # 기본 설정한 채널이 아닌 다른 채널로 보내고 싶을 때 기입한다
    pretext: # attachments의 상단에 나오게 되는 일반 텍스트 문자
    color: # attachment에 왼쪽 사이드 컬러. default=red
    author-name: Back-End Exception # attachment의 상단에 나오는 이름
    author-icon: https://media.vlpt.us/images/ayoung0073/post/2db5c70c-d494-4cca-ad58-7b4eaabc3c9a/springboot.jpeg # author-icon 왼쪽에 나올 아이콘의 url링크
    footer: # attachment에 하단에 나올 부분. default=현재 시간

# 암호화
encrypt:
  keyString: docongjiraapitokenencode
```



4. **Frontend** package.json 마지막 부분에 프록시 추가

```json
{
  "name": "docong",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@asseinfo/react-kanban": "^2.2.0",
    "@date-io/date-fns": "^2.13.1",
    "@mui/icons-material": "^5.5.0",
    "@mui/lab": "^5.0.0-alpha.73",
    "@mui/material": "^5.5.0",
    "@mui/styled-engine-sc": "^5.4.2",
    "@sentry/react": "^6.18.2",
    "@sentry/tracing": "^6.18.2",
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^12.1.3",
    "@testing-library/user-event": "^13.5.0",
    "@types/date-fns": "^2.6.0",
    "@types/jest": "^27.4.1",
    "@types/node": "^17.0.21",
    "@types/react": "^17.0.40",
    "@types/react-dom": "^17.0.13",
    "@types/react-redux": "^7.1.23",
    "@types/styled-components": "^5.1.24",
    "@use-it/interval": "^1.0.0",
    "apexcharts": "^3.33.2",
    "axios": "^0.26.1",
    "jwt-decode": "^3.1.2",
    "node-sass": "^7.0.1",
    "polished": "^4.1.4",
    "react": "^17.0.2",
    "react-apexcharts": "^1.4.0",
    "react-async": "^10.0.1",
    "react-dom": "^17.0.2",
    "react-google-login": "^5.2.2",
    "react-icons": "^4.3.1",
    "react-redux": "^7.2.6",
    "react-router-dom": "^6.2.2",
    "react-scripts": "5.0.0",
    "redux": "^4.1.2",
    "redux-devtools-extension": "^2.13.9",
    "redux-logger": "^3.0.6",
    "redux-persist": "^6.0.0",
    "redux-saga": "^1.1.3",
    "styled-components": "^5.3.3",
    "typesafe-actions": "^5.1.0",
    "typescript": "^4.6.2",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "resolutions": {
    "@mui/styled-engine": "npm:@mui/styled-engine-sc@latest"
  },
  "proxy": "http://백엔드서버주소:포트번호"
}
```



5. **Frontend** 모듈 다운로드

```bash
# frontend/docong 폴더로 이동
cd frontend/docong

yarn install
```



6. 플라스크 패키치 설치

```bash
필요할 경우 이 단계에서 가상환경 만듭니다.(설명은 건너뜁니다.)
pip install virtualenv
virtualenv venv

pip3 install flask
```





# 🏁 실행하기



**Back-end**

- [Backend] (Option) Spring boot를 build(jar 파일 생성)

```plaintext
# backend/docong 폴더로 이동해서
cd backend/docong
mvn -B -DskipTests -f backend
```

- 백엔드 실행

  - 생성한 jar 파일 실행

    ```plaintext
    java -jar [filename].jar
    ```

  - 혹은 war 파일 생성하지 않고 demon으로 로컬에서 실행하고 싶다면 STS와 같은 IDEA에서 Spring boot Run을 실행하거나 아래 명령어를 통해 실행

    ```plaintext
    mvn spring-boot:run
    ```



**Front-end**

```bash
# frontend/docong 폴더로 이동
cd frontend/docong

yarn start
```



**ML**

```
# ml 폴더로 이동
cd ml

python3 app.py 
```