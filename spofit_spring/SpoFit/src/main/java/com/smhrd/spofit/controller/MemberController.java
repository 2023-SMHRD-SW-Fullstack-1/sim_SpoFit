package com.smhrd.spofit.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.spofit.domain.Member;
import com.smhrd.spofit.service.MemberService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    @Autowired
    private MemberService service;
    
    // 회원가입
    @RequestMapping(value = "/member/join", method = RequestMethod.POST)
    public String join(@RequestBody Member member) {
        return service.join(member);
    }
    
    
    // 회원 ID 찾기
    @RequestMapping(value="/member/findid", method = RequestMethod.POST)
    public String findId(@RequestBody Member member) {
        String result = service.findId(member);
        return result != null ? result : "NONE";
    }

    // 로그인 기능
    @RequestMapping(value = "/member/login", method = RequestMethod.POST)
    public String[] login(@RequestBody Member member) {
        // 입력 받은 아이디로 데이터베이스에서 멤버 정보를 조회
        String[] memberInfo = service.login(member);
        return memberInfo;
    }

    // 비밀번호 찾기 회원정보 인증
    @RequestMapping(value="/member/findpassword", method = RequestMethod.POST)
    public Integer findPassword(@RequestBody Member member) {
       Integer foundMemberSequence = service.findPassword(member);
        return foundMemberSequence;
    } 
    
    
    // 비밀번호 변경
    @RequestMapping(value = "/member/changepassword", method = RequestMethod.POST)
    public String changePassword(@RequestBody Member member) {
        return service.changePassword(member);
    }
    
    
    // 마이페이지 -> 사용자 프로필 자기소개글 업데이트
    @RequestMapping(value = "/member/updatemypage", method = RequestMethod.POST)
    public String updateFreePost(@RequestBody Member member ){
       return service.updateFreePost(member);
    }
    
    // 마이페이지 : DB데이터 -> 프론트
    @GetMapping("/member/loadfreepost")
    public String loadFreePost(@RequestParam("m_seq") int m_seq) {
       Member member = new Member();
       member.setM_seq(m_seq);
       return service.loadFreePost(member);
    }
    
    //마이페이지 : DB이미지 데이터 -> 프론트
    @GetMapping("/member/getprofileimage")
    public ResponseEntity<Resource> getProfileImage(@RequestParam("m_seq") int m_seq) {
        Member member = new Member();
        member.setM_seq(m_seq);
        String imagePath = service.getProfileImage(member);
        
        if (imagePath == null) {
            imagePath = "/img/defaultImage.jpg";
        }
        
        Path imgPath = Paths.get("src/main/resources/static" + imagePath); // 경로 변경
        Resource imgResource = null;
        
        try {
            imgResource = new UrlResource(imgPath.toUri());
            
            if (imgResource.exists()) {
                return ResponseEntity.ok(imgResource);
            } else {
                throw new RuntimeException("Image not found!");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // 이미지 저장하는 메소드
    private String saveProfileImage(MultipartFile file, int mSeq) {
        UUID uuid = UUID.randomUUID(); // 이 부분 추가
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        // 이 부분 수정
        String newFileName = mSeq + "_" + uuid.toString() + fileExtension;
        String uploadDir = "src/main/resources/static/img";
        Path filePath = Paths.get(uploadDir, newFileName);

        try (InputStream is = file.getInputStream()) {
            Files.copy(is, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        return "/img/" + newFileName;
    }

    // 프로필 이미지 업로드
    @PostMapping("/member/updateprofile")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("m_seq") int mSeq, @RequestPart("file") MultipartFile file) {
        try {
            String imagePath = saveProfileImage(file, mSeq);

            if (imagePath != null) {
                service.updateProfileImagePath(mSeq, imagePath);
                return ResponseEntity.status(HttpStatus.OK).body(imagePath); // 변경 사항
            } else {
                return new ResponseEntity<>("프로필 이미지 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("프로필 이미지 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}