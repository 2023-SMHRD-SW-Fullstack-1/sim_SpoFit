package com.smhrd.spofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import com.smhrd.spofit.domain.Board;

@Mapper
public interface BoardMapper {
	
	//board list 조회
	public List<Board> select();
	
	//글 생성
	public  void boardInsert(Board board);

	
	//게시판 타입
	public List<Board> selectByBtype(String b_type);
	
	//닉네임
	public String getUserNick(int m_seq);
	
	//조회수 증가
	public void incBoardViews(@Param("b_seq") int bSeq);
	
	//글 상세보기
	public Board getBoardDetail(@Param("b_seq") int bSeq);
	
	//글 삭제
	public void deleteBoardDetail(@Param("b_seq") int bSeq);
	
	//글 수정
	public void updateBoardDetail(Board board);
	
	//공지사항 부분
	//공지사항 글 생성
	public void noticeInsert(Board board);
	
	//공지사항불러오기
	public List<Board> getNoticeList();
	
	//조회수 증가
	public void incNoticeViews(@Param("b_seq") int bSeq);
	
	//공지사항 관리자 확인
	public Integer getAdminMSeq();
	//public Boolean admin_yn(Integer userSeq);
	
	//공지사항 수정
	public void updateNotice(Board board);
	
	//공지사항 삭제
	public void deleteNotice(int bSeq);
}
