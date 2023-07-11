
## 🚴‍♀🚴‍♂Do your Challenge! ( 팀명 : Spo-Fit )
![image](https://github.com/2023-SMHRD-SW-Fullstack-1/sim_SpoFit/assets/126782416/d0ff7101-a2aa-41ec-9bbf-3ae396fd9d79)


## 👩‍🏫서비스 소개

* 서비스 명 : 레포츠별 챌린지 제작 및 공유 서비스
* 서비스 설명 : 레포츠 활동을 위주로 To-Do List와 유사한 챌린지를 사용자가 직접 제작하고 
	      다른 사용자와 공유하는 커뮤니티 서비스 
<br>

## 🗓프로젝트 기간 

2023.06.11 ~ 2023.06.25 (2주) 
<br>

## 🎮주요 기능

* Kakao MapAPI 연동을 통한 시설 탐색 서비스
* 챌린지 서비스(생성, 관리, 저장, 공유)
* DB를 활용한 개별 회원 서비스 관리
* 회원 서비스(로그인,회원가입,비밀번호 변경,아이디 찾기)
* 마이페이지(프로필사진,자기소개글)를 활용한 커뮤니티 서비스
* 필터링 기능을 통한 레포츠 조회서비스
* 커뮤니티 서비스(공지사항, 자유게시판, 댓글)
  
<br>

## 🌐기술 스택 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <br>
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/apache tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<br>

## 😶유스케이스
![SpoFitUseCase](https://github.com/2023-SMHRD-SW-Fullstack-1/sim_SpoFit/assets/126782416/b027a470-1b2f-428c-9c2a-980bb59bda75)
<br>


## 📰ER-Diagram
![SPOFIT_ERDIAGRAM](https://github.com/2023-SMHRD-SW-Fullstack-1/sim_SpoFit/assets/126782416/c3682a97-65d5-44c1-a2fc-f98e9b90d583)
<br>

## 화면 구성
![image](https://github.com/2023-SMHRD-SW-Fullstack-1/sim_SpoFit/assets/126782416/18ff92e2-9c3c-4dea-92b0-58d4507680fe)

<br>

## 👨‍👩‍👧‍👧팀원 역할
<div align="center">
<table>
  <tr>
    <th>이름</th>
    <th>역할</th>
  </tr>
  <tr>
    <td style={"text-align": "center"}><b>김 소 희</b></td>
    <td><b>Front-end (React, CSS)</b>
    <br>
    UI/UX 디자인 관리, KaKaoMap API 활용, GitHub 관리, 반응형 웹 관리, 애니메이션 기능
    </td>
  </tr>
 
  <tr>
    <td style={"text-align": "center"}><b>박 정 현</b></td>
    <td colspan="4"><b>Front-end (React, CSS), Back-end (Spring)</b>
    <br>
    서버 연결 관리, 챌린지 기능 관리, 데이터베이스 설계, GitHub 관리, 일정 관리 기능 활용
    </td>
  </tr>
  
  <tr>
    <td style={"text-align": "center"}><b>서 유 광</b></td>
    <td colspan="2"><b>Front-end (React, CSS), Back-end (Spring)</b>
    <br>
    데이터베이스 관리, 테이블 제약조건 관리, 회원 관리 페이지, 기능, 마이페이지 관리, Axios 활용, 데이터베이스 산출문서 관리
    </td>
  </tr>
  <tr>
    <td style={"text-align": "center"}><b>이 선 아</b></td>
    <td colspan="2"><b>Back-end (Spring), Front-end 관리</b>
    <br>
    Paging 기능 관리, 게시판, 댓글 관리, 이미지 업로드 기능, 산출문서 관리, Axios 활용
    </td>
  </tr>
</table>
<br>
</div>

## 🎯트러블슈팅 

문제상황 : 데이터베이스 구축 이후 INSERT로 테스트 데이터 삽입 시 트리거 오류가 발생
![image](https://github.com/2023-SMHRD-SW-Fullstack-1/sim_SpoFit/assets/126782416/6a096333-6c12-4c8f-8781-35445156ed00)

해결과정
1. 트리거 존재 여부 확인
2. 트리거 권한 확인 ( select * from 테이블명 where privilege = 'create trigger';
3. 트리거 재 컴파일 ( alter trigger 트리거 명 compile;
4. 시퀀스 값이랑 트러가 값을 전부 제거하고 다시 설정 ( 해결 완료 ) 
<br>

## 📣프로젝트 향후 개선사항 
<ul>
	<li> 글 작성 시 폰트나 색깔을 커스텀 할 수 있는 기능 </li>
	<li> 프로필 사진 등록 시 사진 크기 조절 기능 </li>
	<li> 복잡한 테이블 구조 간소화 </li>
	<li> 관리자 계정에 통계적 자료 제공 </li>
	<li> 커뮤니티와 챌린지의 운동 항목별 분류 </li>
</ul>

