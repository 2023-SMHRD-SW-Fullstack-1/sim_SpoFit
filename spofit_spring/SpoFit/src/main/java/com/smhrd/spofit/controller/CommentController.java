package com.smhrd.spofit.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.spofit.domain.Comment;
import com.smhrd.spofit.service.CommentService;


@RestController
//CORS : Cross-Origin 문제 서로다른서버에서 왔다갔다하므로 문제가 생긴다.
//설정을 해주어야함
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
	
	@Autowired
	 private CommentService service;
	
	// 댓글 목록 가져오기
    @GetMapping("/community/boarddetail/{b_seq}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable("b_seq") int b_seq) {
        List<Comment> comments = service.getComments(b_seq);
        return ResponseEntity.ok(comments);
    }

    
    // 댓글 생성
    @PostMapping("/community/boarddetail/{b_seq}/comments")
    public ResponseEntity<Comment> createComment(@PathVariable("b_seq") int b_seq, @RequestBody Map<String, Object> paramMap) {
        String cmt_context = (String) paramMap.get("cmt_context");
        int m_seq = Integer.parseInt((String) paramMap.get("m_seq"));
        Comment createdComment = service.createComment(b_seq, cmt_context, m_seq);
        return ResponseEntity.ok(createdComment);
    }

    // 댓글 수정
    @PutMapping("/community/boarddetail/{b_seq}/comments/{cmt_seq}")
    public ResponseEntity<Comment> updateComment(
        @PathVariable("b_seq") int b_seq,
        @PathVariable("cmt_seq") int cmt_seq,
        @RequestBody Comment comment
    ) {
        Comment updatedComment = service.updateComment(b_seq, cmt_seq, comment);
        return ResponseEntity.ok(updatedComment);
    }

    
    // 댓글 삭제
    @DeleteMapping("/community/boarddetail/{b_seq}/comments/{cmt_seq}")
    public ResponseEntity<Void> deleteComment(
        @PathVariable("b_seq") int b_seq,
        @PathVariable("cmt_seq") int cmt_seq
    ) {
        service.deleteComment(b_seq, cmt_seq);
        return ResponseEntity.noContent().build();
    }

   

}
