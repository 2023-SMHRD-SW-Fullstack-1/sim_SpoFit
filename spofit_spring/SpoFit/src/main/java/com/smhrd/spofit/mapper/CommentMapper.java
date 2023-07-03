package com.smhrd.spofit.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.smhrd.spofit.domain.Comment;

@Mapper
public interface CommentMapper {
	// 댓글 목록 가져오기
    public List<Comment> getComments(int b_seq);
  
    // 댓글 생성
   public void createComment(Comment comment);
   
   // 댓글 수정
   public void updateComment( Comment comment);
  
   // 댓글 삭제
   public void deleteComment( int cmt_seq);
   
   //댓글 한개 가져오기 
   public Comment getComment(int cmt_seq);
   
}
