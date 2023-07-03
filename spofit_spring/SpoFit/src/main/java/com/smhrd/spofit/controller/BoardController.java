package com.smhrd.spofit.controller;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.smhrd.spofit.domain.Board;
import com.smhrd.spofit.service.BoardService;


@RestController
//CORS : Cross-Origin 문제 서로다른서버에서 왔다갔다하므로 문제가 생긴다.
//설정을 해주어야함
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {

	@Autowired
	private BoardService service;
	// 커뮤니티 게시판과 관련된 내용을 수행하시오
	// 커뮤니티 게시판 내용 불러오기 공지사항 확인하기 등등
	
	//~~~~ 자유게시판 ~~~~
	//게시판 내용 불러오기
	@GetMapping("/community")
	public List<Board> boardList(Model model) {
		List<Board> boardList = service.select();
		model.addAttribute("model", boardList);
		return boardList;
	}
	
	//게시판 글 작성 데이터 삽입하기
	@PostMapping("/community/boardcreate")
	public ResponseEntity<?> boardCreate(@RequestParam("b_title") String b_title,
	        @RequestParam("b_content") String b_content,
	        @RequestParam("m_seq") int m_seq,
	        @RequestParam("b_type") String b_type,
	        @RequestPart(name="b_file") List<MultipartFile> files) 
	{    
		//닉네임 가져오기 
		String m_nick = service.getUserNick(m_seq);
		// boardInsert 메서드에 매개변수들 전달
		
	    Board boardInsert = service.boardInsert(b_title, b_content,m_seq, m_nick, b_type, files);  
	    return ResponseEntity.ok(boardInsert); 
	}
	

	
	//게시판 타입 보여주기
	@GetMapping("/community/{b_type}")
	public ResponseEntity<List<Board>> boardListByBtype(@PathVariable("b_type") String b_type) {
	    // 결과 반환
	    List<Board> boardList = service.selectByBtype(b_type);
	    return ResponseEntity.ok().body(boardList);
	}
	
	//게시판 글 (BoardDeatil) 글 하나 가져오기
	@GetMapping("/community/boarddetail/{b_seq}")
	  public ResponseEntity<Board> getBoardDetail(@PathVariable("b_seq") int bSeq) {
	    Board board = service.getBoardDetail(bSeq);
	    if (board != null) {
	    	System.out.println("성공");
	      return ResponseEntity.ok(board);
	    } else {
	    	System.out.println("실패");
	      return ResponseEntity.notFound().build();
	    }
	  }
	
	//게시판 글 삭제
	@DeleteMapping("/community/boarddelete/{b_seq}")
	public void deleteBoardDetail(@PathVariable("b_seq") int bSeq) {
	   service.deleteBoardDetail(bSeq);
	}

	
	//게시판 글 수정
	@PutMapping("/community/boardupdatedetail/{b_seq}")
	public ResponseEntity<String> updateBoardDetail(
	    @PathVariable("b_seq") int bSeq,
	    @RequestBody Board board
	) {
	    try {
	        // 게시물 업데이트를 위한 서비스 호출하기
	        service.updateBoardDetail(bSeq, board.getB_title(), board.getB_content());
	        return ResponseEntity.ok("게시물이 업데이트되었습니다.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 업데이트에 실패했습니다.");
	    }
	}
	
	
	//게시판 글 조회수 증가
	@PutMapping("/community/boarddetail/inc_views/{b_seq}")
    public ResponseEntity<String> incBoardViews(@PathVariable("b_seq") int bSeq) {
        try {
            service.incBoardViews(bSeq);
            return ResponseEntity.ok("조회수가 증가하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("조회수 증가에 실패했습니다.");
        }
    }
	
	//~~~공지사항 부분~~~~~
	
	//공지사항 추가하기

	@PostMapping("/noticelist/create")
	public ResponseEntity<?> noticeCreate(@RequestParam("b_title") String b_title,
                                      @RequestParam("b_content") String b_content,
                                      @RequestParam("m_seq") int m_seq,
                                      @RequestParam("b_type") String b_type) {
    Board notice = service.noticeCreate(b_title, b_content, m_seq, b_type);
    return ResponseEntity.ok(notice);
	}
	
	//공지사항 불러오기
	@GetMapping("/noticelist")
	public  ResponseEntity<?> getNoticeList() {
	    List<Board> noticeList = service.getNoticeList();
	    return ResponseEntity.ok(noticeList);
	}
	
	//공지사항 조회수 증가
	@PutMapping("/noticelist/inc_views/{b_seq}")
    public ResponseEntity<String> incNoticeViews(@PathVariable("b_seq") int bSeq) {
        try {
            service.incNoticeViews(bSeq);
            return ResponseEntity.ok("조회수가 증가하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("조회수 증가에 실패했습니다.");
        }
    }
	
	//공지사항 관리자 확인
	@GetMapping("/noticelist/admin_yn")
	public ResponseEntity<Integer>getAdminMSeq(){
		Integer adminMSeq = service.getAdminMSeq();
		return ResponseEntity.ok(adminMSeq);
	}
	
	//공지사항 수정
	@PutMapping("/noticelist/update/{b_seq}")
	public ResponseEntity<String> updateNotice(
	    @PathVariable("b_seq") int bSeq,
	    @RequestBody Board board
	) {
	    try {
	        service.updateNotice(bSeq, board.getB_title(), board.getB_content());
	        return ResponseEntity.ok("공지사항이 수정되었습니다.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("공지사항 수정에 실패했습니다.");
	    }
	}

	//공지사항 삭제
	@DeleteMapping("/noticelist/delete/{b_seq}")
	public ResponseEntity<String> deleteNotice(@PathVariable("b_seq") int bSeq) {
	    try {
	        service.deleteNotice(bSeq);
	        return ResponseEntity.ok("공지사항이 삭제되었습니다.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("공지사항 삭제에 실패했습니다.");
	    }
	}


	
}
