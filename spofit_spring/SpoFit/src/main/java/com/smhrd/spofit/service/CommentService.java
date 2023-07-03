package com.smhrd.spofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.smhrd.spofit.domain.Comment;
import com.smhrd.spofit.mapper.CommentMapper;

@Service
public class CommentService {
	 @Autowired
	    private CommentMapper mapper;

	    // 댓글 목록 가져오기
	    public List<Comment> getComments(int b_seq) {
	        System.out.println("댓글 불러오기 성공");
	    	return mapper.getComments(b_seq);
	    }

	    // 댓글 생성
	    public Comment createComment(int b_seq, String cmt_context, int m_seq) {
	        Comment comment = new Comment();
	        comment.setB_seq(b_seq);
	        comment.setCmt_context(cmt_context);
	        comment.setM_seq(m_seq);
	        
	        mapper.createComment(comment);
	        System.out.println("댓글 생성 성공");
	        return comment;
	    }
	    
	    // 댓글 수정
	    public Comment updateComment(int b_seq, int cmt_seq, Comment comment) {
	        comment.setCmt_seq(cmt_seq);
	        mapper.updateComment(comment);
	        System.out.println("댓글 수정 성공");
	        return mapper.getComment(cmt_seq);
	    }
	    
	    // 댓글 삭제 
	    public void deleteComment(int b_seq, int cmt_seq) {
	    	System.out.println("댓글 삭제 성공");
	       mapper.deleteComment(cmt_seq);
	    }


}
