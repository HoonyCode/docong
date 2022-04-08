

# 두콩(DOCONG)

<img width="1459" alt="image" src="https://user-images.githubusercontent.com/44612896/161991250-2d06877d-f4d6-4911-9c94-7ea4c364bc72.png">

<br/>

**웹 기반 Pomodoro Timer 및 집중 시간 분석 서비스**

> 여러분은 집중을 잘하고 계신가요?<br/>
> 얼마나 프로젝트에 집중했는지? 어떤 분야에 내가 시간을 투자했는지? 궁금한 적이 있지 않으신가요?
>
> <br/>
>
> <br/>
>
> 할 일을 생성하고 타이머 사용해 최대한 집중력을 발휘해 보세요! <br/>
> 콩을 분석해서 여러분의 시간을 분석해보세요!
>
> <br/>

<br><br>

## 프로젝트 목차
- [두콩(DOCONG)](#두콩DOCONG)
  - [프로젝트 목차](#프로젝트-목차)
  - [1️⃣ 프로젝트 소개](#1️⃣-프로젝트-소개)
    - [📋 기술 스택](#-기술-스택)
    - [🧱 애플리케이션 아키텍처](#-애플리케이션-아키텍처)
    - [🎨 디자인](#-디자인)
  - [2️⃣ 프로젝트 파일 구조](#2️⃣-프로젝트-파일-구조)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [4️⃣ 프로젝트 산출물](#4️⃣-프로젝트-산출물)
  - [5️⃣ 프로젝트 결과](#5️⃣-프로젝트-결과)
  <br><br>

## 1️⃣ 프로젝트 소개
1. 일정 : 2021-02-12 ~ 2021-04-07 (총 7주)
2. 인원 (총 5인)
    - [이정음](https://github.com/jeongum) : 팀장, Backend,  Machine Learning
    - [김영훈](https://github.com/HoonyCode) : Backend, Infra
    - [유혜승](https://github.com/hazel-u) : Backend, Frontend
    - [이재희](https://github.com/Hui-Story) : Frontend
    - [이남수]() : Backend, Infra
    - [하현서](https://github.com/hyunse0) : Backend, Machine Learning

<br><br>

### 📋 기술 스택

1. 이슈관리 : Jira
2. 형상관리 : Gitlab
3. 커뮤니케이션 : Mattermost, Notion, slack
4. 디자인 : Figma
5. 개발 환경
   - OS : Windwos 10
   - DB : MariaDB 10.7.3
   - Server : AWS EC2, Ubuntu 20.04, Jenkins 2.303.2, nginx 1.18.0
6. Frontend
   - HTML5, node-sass 7.0.1, TypeScript 4.6.2
   - React 17.0.2, react-redux 7.2.6, Node.js 16.14.0, Yarn 1.22.17
   - redux-saga 1.1.3, react-router-dom 6.2.2, styled-components 5.3.3, material-ui 5.5.0, react-apexcharts 1.4.0
7. Backend
   - Java JDK 11
   - SpringBoot 2.6.4, Spring JPA, Spring Security
   - Lombok 1.18.20, Swagger 2.9.2, jwt 3.18.2
8. Machine Learning
   -  pandas 
   - scikit-learn 
10. IDE&Tool
    - intelliJ 21.3.2
    - HeidiSQL
    - Visual Studio Code 1.65.2

<br><br>

### 🧱 애플리케이션 아키텍처

<img width="1000" alt="image" src="https://user-images.githubusercontent.com/44612896/162042288-b1597f5b-c9f1-465c-8d26-1f9f4dc8263e.png">

<br><br>

### 🎨 디자인

<img width="1000" alt="image" src="https://user-images.githubusercontent.com/44612896/162036475-7e91caab-928e-4ff4-9130-7635045c7fc3.png">

<br><br>

## 2️⃣ 프로젝트 파일 구조

### Backend

```
backend/docong/src
├── main
│   ├── java
│   │   └── com
│   │       └── b5f1
│   │           └── docong
│   │               ├── DocongApplication.java
│   │               ├── aop
│   │               ├── api
│   │               │   ├── controller
│   │               │   │   └── ...
│   │               │   ├── dto
│   │               │   │   ├── request
│   │               │   │   │   └── ...
│   │               │   │   └── response
│   │               │   │       └── ...
│   │               │   ├── exception
│   │               │   │   ├── CustomException.java
│   │               │   │   ├── ErrorCode.java
│   │               │   │   ├── handler
│   │               │   │   │   └── ...
│   │               │   │   ├── model
│   │               │   │   │   └── ...
│   │               │   │   └── sender
│   │               │   │       └── ...
│   │               │   ├── resolver
│   │               │   │   └── ...
│   │               │   └── service
│   │               │       └── ...
│   │               ├── config
│   │               │   ├── ...
│   │               │   ├── auth
│   │               │   │   └── ...
│   │               │   ├── jwt
│   │               │   │   └── ...
│   │               │   └── oauth
│   │               │       └── provider
│   │               │           └── ...
│   │               ├── core
│   │               │   ├── domain
│   │               │   │   ├── BaseEntity.java
│   │               │   │   ├── group
│   │               │   │   │   └── ...
│   │               │   │   ├── mattermost
│   │               │   │   │   └── MattermostProperties.java
│   │               │   │   ├── pomodoro
│   │               │   │   │   └── ...
│   │               │   │   ├── todo
│   │               │   │   │   └── ...
│   │               │   │   └── user
│   │               │   │       └── ...
│   │               │   ├── queryrepository
│   │               │   │   └── ...
│   │               │   └── repository
│   │               │       └── ...
│   │               └── security
│   │                   └── jwt
│   │                       └── fill.txt
│   └── resources
│       ├── application-aws.yml
│       ├── application-local.yml
│       └── application.yml
└── test
    ├── java
    │   └── com
    │       └── b5f1
    │           └── docong
    │               ├── DocongApplicationTests.java
    │               └── api
    │                   ├── controller
    │                   │   └── ...
    │                   ├── dto
    │                   └── service
    │                       └── ...
    └── resources
        └── application.yml

```

### Frontend

```
frontend/docong/src
├── @types
│   ├── apexcharts.d.ts
│   └── index.d.ts
├── App.test.js
├── App.tsx
├── api
│   └── ...
├── components
│   ├── auth
│   │   └── ...
│   ├── group
│   │   └── ...
│   └── user
│       └── ...
├── containers
│   ├── NavBarContainer.tsx
│   ├── auth
│   │   └── ...
│   ├── group
│   │   └── ...
│   └── user
│       └── ...
├── hooks
│   └── user
│       └── ...
├── index.scss
├── index.tsx
├── lib
│   └── ...
├── logo.svg
├── modules
│   ├── group
│   │   └── ...
│   ├── groupTodo
│   │   └── ...
│   ├── index.ts
│   ├── todo
│   │   └── ...
│   └── user
│       └── ...
├── pages
│   ├── NavBarPage.tsx
│   ├── auth
│   │   └── ...
│   ├── group
│   │   └── ...
│   └── user
│       └── ...
├── reportWebVitals.ts
├── serviceWorkerRegistration.js
└── setupTests.ts
```

<br>

## 4️⃣ 프로젝트 산출물



| Notion                         | [Docong Notion 바로가기](https://hoonycode.notion.site/DOCONG-5edb319c5fe740d59e9aa2d51862f48a) |
| ------------------------------ | ------------------------------------------------------------ |
| **프로젝트 계획서**            | [바로가기](https://hoonycode.notion.site/3a0858e268ed4ab38f84958f9c4c35b9) |
| **요구사항 명세서**            | [바로가기](https://hoonycode.notion.site/97a540499299439ea6e546e879949148?v=243ee694716c4ca186d3e42dcabd8efe) |
| **과제 리뷰 일지 & 미팅 자료** | [바로가기](https://hoonycode.notion.site/8e68bf7fa3464389acfd40b19ebf3a7c) |
| **팀 컨벤션**                  | [바로가기](https://hoonycode.notion.site/ff83485995444308b9b90d5f86c47bf7) |
| **학습 자료 공유**             | [바로가기](https://hoonycode.notion.site/616eabbded3d4e1a93503a98135811fd) |
| **Wireframe**                  | [바로가기](https://www.figma.com/file/9Zam5pM8ZUlpRlAYgzl2I5?embed_host=notion&kind=&node-id=207%3A275&viewer=1) |
| **Mockup & Prototype**         | [바로가기](https://www.figma.com/file/VoUaXkmQT3bf7t7E5Lw3YX?embed_host=notion&kind=&node-id=0%3A1&viewer=1) |
| **유저가이드**                 | [바로가기](https://mangrove-purchase-535.notion.site/Docong-User-Guide-5591e2fb4f87445e82e55bd34e5b6bbe) |
| **ERD**                        | [바로가기](https://hoonycode.notion.site/9aeabbaf31f94b39ba48f7584ed7d118) |
| **BackEnd - API Docs**         | [바로가기](https://hoonycode.notion.site/d72a1a3fc764466d8ad1301cd312fdbd?v=1ff66a9be81348c79ae8eed07b507324) |
| **포팅 메뉴얼**                | [바로가기](https://lab.ssafy.com/s06-s-project/S06P21S003/-/wikis/%ED%8F%AC%ED%8C%85-%EB%A9%94%EB%89%B4%EC%96%BC) |
| **최종 발표 자료**             | [바로가기]()                                                 |
| **프로젝트 서비스 UCC**        | [바로가기]()                                                 |



## 5️⃣ 프로젝트 결과

