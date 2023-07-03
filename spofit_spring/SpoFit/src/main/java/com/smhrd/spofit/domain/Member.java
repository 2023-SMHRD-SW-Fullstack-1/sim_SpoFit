package com.smhrd.spofit.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
	private int m_seq; // 회원 시퀀스 식별 값
	private String m_id; // 회원 아이디 
	private String m_pw; // 회원 패스워드
	private String m_email;// 회원 이메일
	private String m_nick; //회원 닉네임
	private String m_jumin; // 회원 주민등록 번호
	private String newPassword; // 새로운 비밀번호
	private String confirmPassword; // 비밀번호 확인
	private String m_profile; //회원 프로필사진
	private String m_freepost; // 회원 자유글
	private String profile_image_url; 
	
	//회원 닉네임과 시퀀스 넘버를 세션으로 보내줄 메서드
	public Member(String m_nick, int m_seq) {
		this.m_nick = m_nick;
		this.m_seq = m_seq; 
	}
	
//	public void Member(String m_freepost) {
//		this.m_freepost = m_freepost;
//	}
	
	
}