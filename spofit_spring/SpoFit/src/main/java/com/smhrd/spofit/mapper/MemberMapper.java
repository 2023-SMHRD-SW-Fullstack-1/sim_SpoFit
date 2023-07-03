package com.smhrd.spofit.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.smhrd.spofit.domain.Member;

@Mapper
public interface MemberMapper {
	
	//회원가입
	@Insert("INSERT INTO T_MEMBER (M_ID, M_NICK, M_EMAIL, M_PW, M_JUMIN, M_DT, ADMIN_YN) VALUES (#{m_id}, #{m_nick}, #{m_email}, #{m_pw}, #{m_jumin}, SYSDATE, 'N')")
    public void join(Member member);
	
	// 아이디 중복 체크
	@Select("SELECT m_id FROM T_MEMBER WHERE m_id = #{m_id}")
	public String duplicationId(String m_id);
	
	//아이디 찾기
	public String findId(Member member);
	
	// 닉네임 중복 체크
	@Select("SELECT m_nick FROM T_MEMBER WHERE m_nick = #{m_nick}")
	public String findNick(String m_nick);
	
	//로그인
	@Select("SELECT * FROM T_MEMBER WHERE m_id = #{m_id} and m_pw = #{m_pw}")
    public Member login(String m_id, String m_pw);
	
	//비밀번호 찾기 회원인증
	@Select("SELECT m_seq FROM T_MEMBER WHERE m_nick = #{m_nick} AND m_id = #{m_id} AND m_email = #{m_email}")
	public Integer findPassword(Member member);

	// 비밀번호 변경
    @Update("UPDATE T_MEMBER SET m_pw = #{newPassword} WHERE m_seq = #{m_seq}")
    public void changePassword(Member member);
    
    // 마이페이지 -> 회원 프로필 자기소개글 변경
    @Update("UPDATE T_MEMBER SET M_FREEPOST = #{m_freepost} WHERE M_SEQ = #{m_seq}")
    public void updateFreePost(Member member);
    
    // 회원 자기소개 : DB정보 -> 프론트
    @Select("SELECT m_freepost FROM T_MEMBER WHERE M_SEQ=#{m_seq}")
    public String loadFreePost(Member member);
    
    // 프로필 이미지 업데이트
    @Update("UPDATE T_MEMBER SET m_profile = #{imagePath} WHERE m_seq = #{mSeq}")
    void updateProfileImagePath(int mSeq, String imagePath);
    
    // 사진 : DB정보 -> 프론트
    @Select("SELECT M_PROFILE FROM T_MEMBER WHERE m_seq=#{m_seq}")
    public String getProfileImage(Member member);
    
    
}

