package com.smhrd.spofit.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.smhrd.spofit.domain.Board;
import com.smhrd.spofit.mapper.BoardMapper;


@Service
public class BoardService {
	
	@Autowired
	private BoardMapper mapper;
	
	
	//게시판 글 조회
	public List<Board> select(){
		return mapper.select();
	}
	//글 생성
	public Board boardInsert(String b_title, String b_content,int m_seq,String m_nick,  String b_type, List<MultipartFile> files ){
	    
		Board board = new Board();
	    board.setB_title(b_title);
	    board.setB_content(b_content);
	    board.setM_seq(m_seq);
	    board.setB_type(b_type);

	    
	 // 파일 처리 및 파일 경로 설정
	    List<String> fileUrls = new ArrayList<>();
	    for (MultipartFile file : files) {
	        String fileUrl = saveFile(file); // 파일 저장 및 파일 경로 반환하는 메서드 호출
	       if(fileUrl != null) {
	    	   fileUrls.add(fileUrl);
	       }
	        
	    }
	    board.setB_file(String.join(",", fileUrls)); // 파일 경로를 문자열로 변환하여 Board 객체에 저장

	    
	    // 생성된 Board 객체를 DB에 삽입 (mapper를 활용하여 DB 작업)
	    mapper.boardInsert(board);
	    
	    return board;
	}
	
	//게시판 타입 선택
	public List<Board> selectByBtype(String b_type) {
	    return mapper.selectByBtype(b_type);
	}
	
	//닉네임 

	public String getUserNick(int m_seq) {
	    String m_nick = mapper.getUserNick(m_seq);
	    System.out.println("m_seq 값: " + m_seq);
	    System.out.println("닉네임: " + m_nick);
	    return m_nick;
	}
	 //이미지 파일 저장하기
	public String saveFile(MultipartFile file) {
	    // 파일 저장
	    // 예시: 원본 파일의 확장자를 유지하여 저장하는 방식
	    String originalFileName = file.getOriginalFilename(); // 원본 파일 이름
	    String fileName = UUID.randomUUID().toString() + getExtension(originalFileName); // 임의의 파일 이름 + 확장자
	    String directoryPath = "src/main/resources/static/img"; // 파일이 저장될 디렉토리 경로
	    
	    try {
	    	 // 디렉토리 생성
//	        File directory = new File(directoryPath);
//	        if (!directory.exists()) {
//	            directory.mkdirs();
//	        }
	        // 파일 저장 로직 구현
	        byte[] bytes = file.getBytes();
	        Path path = Paths.get(directoryPath, fileName);
	        Files.write(path, bytes);
	        
	        System.out.println("파일 저장 성공");

            String filePath = "static/img/" + fileName; // 리액트 웹에서 접근 가능한 파일 경로
            System.out.println(filePath);
            return filePath; // 저장된 파일의 경로 반환
	    } catch (IOException e) {
	        // 파일 저장 실패 시 예외 처리
	        e.printStackTrace();
	        System.out.println("파일 저장 실패");
	        return null;
	    }
	}
	
	//확장자까지 저장하기
	private String getExtension(String filename) {
	    int lastIndex = filename.lastIndexOf(".");
	    if (lastIndex == -1) {
	        return ""; // 확장자가 없는 경우
	    }
	    return filename.substring(lastIndex); // 확장자를 포함한 경우
	}
	
	//글 상세보기
	public Board getBoardDetail(int bSeq) { 
		
		return mapper.getBoardDetail(bSeq);
	    
	}

    
    //글 삭제하기 
    public void deleteBoardDetail(int bSeq) {
        // 게시물의 이미지 경로 조회
        Board board = mapper.getBoardDetail(bSeq);
        if (board == null) {
            // 게시물이 존재하지 않음
            return ;
        }
        // 게시물의 이미지 경로 조회
        String bFile = board.getB_file();
        if (bFile != null) {
            String[] fileUrls = bFile.split(",");
            System.out.println(bFile);
            // 이미지 파일 삭제
            for (String fileUrl : fileUrls) {
                deleteImageFile(fileUrl);
            }
        }

        // 게시물 삭제
        mapper.deleteBoardDetail(bSeq);
    }
    
    //이미지 삭제
    public void deleteImageFile(String filePath) {
        // 이미지 경로 생성
        String imageDirectory = "src/main/resources/static";
        String imagePath = Paths.get(imageDirectory, filePath).toString(); // 추가된 부분

        // 이미지 파일 삭제 로직 구현
        File file = new File(imagePath);
        if (file.exists()) {
            if (file.delete()) {
                System.out.println("이미지 파일 삭제 성공: " + imagePath);
            } else {
                System.out.println("이미지 파일 삭제 실패: " + imagePath);
            }
        } else {
            System.out.println("이미지 파일이 존재하지 않습니다: " + imagePath);
        }
    }
    
    // 게시글 수정하기
    public Board updateBoardDetail(int bSeq, String b_title, String b_content) {
        // 기존 게시글 정보 가져오기
        Board board = mapper.getBoardDetail(bSeq);
        if (board == null) {
            // 게시글이 존재하지 않음
        	System.out.println("게시글이 존재하지 않음 ");
        	return null;
        }

        // 게시글 수정
        board.setB_title(b_title);
        board.setB_content(b_content);
        mapper.updateBoardDetail(board);
        return board;
    }   
    
    //게시글 조회수 증가
    public void incBoardViews(int bSeq) {
        mapper.incBoardViews(bSeq);
    }
    
    //공지사항 추가하기
    public Board noticeCreate(String b_title, String b_content, int m_seq, String b_type) {
	    Board board = new Board();
	    board.setB_title(b_title);
	    board.setB_content(b_content);
	    board.setM_seq(m_seq);
	    board.setB_type(b_type);

	    mapper.noticeInsert(board);

	    return board;
    }
    //공지사항 불러오기
    public List<Board> getNoticeList(){
    	System.out.println("공지사항 불러오기 성공");
    	return mapper.getNoticeList();
    }
    
    //공지사항 조회수 증가
    public void incNoticeViews(int bSeq) {
    	System.out.println("공지사항 조회수 증가 성공");
        mapper.incNoticeViews(bSeq);
    }
    
    //공지사항 관리자 확인
    public Integer getAdminMSeq() {
    	 Integer result = mapper.getAdminMSeq();
    	 System.out.println("공지사항 관리자 확인 결과: " + result);
    	
    	return mapper.getAdminMSeq();
    }
    
    // 공지사항 수정
    public void updateNotice(int bSeq, String b_title, String b_content) {
        Board board = new Board();
        board.setB_seq(bSeq);
        board.setB_title(b_title);
        board.setB_content(b_content);
        mapper.updateNotice(board);
    }

    // 공지사항 삭제
    public void deleteNotice(int bSeq) {
        mapper.deleteNotice(bSeq);
    }



}
