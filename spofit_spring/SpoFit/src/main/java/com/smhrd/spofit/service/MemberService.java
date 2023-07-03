package com.smhrd.spofit.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.spofit.domain.Member;
import com.smhrd.spofit.mapper.MemberMapper;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;

@Service
public class MemberService {
    
    @Autowired
    private MemberMapper mapper;
    
    // 회원가입
    public String join(Member member) {
        // 입력 받은 회원가입 정보를 데이터베이스에 저장

        // 아이디 중복 체크
        String existingId = mapper.duplicationId(member.getM_id());
        if (existingId != null) {
            return "DUPLICATE_ID"; // 중복된 아이디가 이미 존재하는 경우
        }

        // 닉네임 중복 체크
        String resultNickname = mapper.findNick(member.getM_nick());
        if (resultNickname != null) {
            return "DUPLICATE_NICKNAME"; // 중복된 닉네임이 이미 존재하는 경우
        }

        // 비밀번호 일치 여부 체크
        if (!member.getNewPassword().equals(member.getConfirmPassword())) {
            return "PASSWORD_MISMATCH"; // 비밀번호와 비밀번호 확인이 일치하지 않는 경우
        }

        try {
            mapper.join(member);
            return "SUCCESS"; // 회원가입 성공
        } catch (Exception e) {
            return "FAILURE"; // 회원가입 실패
        }
    }
    
    
    // 아이디 찾기
    public String findId(Member member) {
        return mapper.findId(member);
    }
    
    
    // 로그인 기능
    public String[] login(Member member) {
        String memberId = member.getM_id();
        String memberPw = member.getM_pw();

        // 입력 받은 아이디로 데이터베이스에서 멤버 정보를 조회
        Member foundMember = mapper.login(memberId,memberPw);
        if(foundMember != null) {
        	String[] memberInfo = {String.valueOf(foundMember.getM_seq()), foundMember.getM_nick()};
        	// 멤버가 존재하고, 입력 받은 비밀번호와 데이터베이스의 비밀번호가 일치하는지 확인
        	return memberInfo;
        }else {
        	return null;
        }
    }
  
    
    // 비밀번호 찾기 회원 정보 인증
    public Integer findPassword(Member member) {
        // 입력 받은 이름, 아이디, 이메일로 데이터베이스에서 회원 비밀번호를 조회
        Integer find = mapper.findPassword(member);
        if (find != null) {
            return find; // 비밀번호 찾기 정보조회 성공
        } else {
            return 0; // 비밀번호 찾기 정보조회 실패
        }
    }
    
    
    // 비밀번호 변경
    public String changePassword(Member member) {
        // 사용자 본인 인증이 이미 완료된 후에 동작함.
        // member 객체에는 새로운 비밀번호 정보와 사용자 식별을 위한 M_SEQ가 담겨 있음.
    	
        // 새로운 비밀번호와 비밀번호 확인이 일치하는지 확인.
        if (!member.getNewPassword().equals(member.getConfirmPassword())) {
        	return "PASSWORD_MISMATCH"; // 비밀번호와 비밀번호 확인이 일치하지 않을 경우 변경 실패
        }
        
        try {
            mapper.changePassword(member);
            return "SUCCESS"; // 비밀번호 변경 성공
        } catch (Exception e) {
            return "FAILURE"; // 비밀번호 변경 실패
        }
    }
    

    // 사용자 프로필 자기소개글 업데이트
    public String updateFreePost(Member member) {
        try {
            mapper.updateFreePost(member); // 자기소개글 업데이트
            return "SUCCESS"; // 자기소개글 업데이트 성공
        } catch (Exception e) {
            return "FAILURE"; // 자기소개글 업데이트 실패
        }
    }
    
    
    // DB -> 프론트 보내기
    public String loadFreePost(Member member) {
    	String loadPost = mapper.loadFreePost(member);
    	return loadPost;
    }
    
    
    // 프로필 이미지 가져오기
    public String getProfileImage(Member member) {
    	String loadFrofileFath = mapper.getProfileImage(member);
        return loadFrofileFath;
    }
    
    
 // 프로필 이미지 저장하기 위한 메소드
    public String saveProfileImage(MultipartFile file, int mSeq) {
        // UUID 생성
        UUID uuid = UUID.randomUUID();

        // 원본 파일 이름에서 확장자 추출
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

        // 이 부분 수정
        // UUID와 확장자를 결합하여 새로운 고유한 파일 이름 생성
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
    
    
    public void updateProfileImagePath(int mSeq, String imagePath) {
        mapper.updateProfileImagePath(mSeq, imagePath);
    }
    
    
    
    // 프로필 이미지 업데이트
    public String updateProfileImage(MultipartFile file, int mSeq) {
        String imagePath = saveProfileImage(file, mSeq);
        if (imagePath != null) {
            try {
                mapper.updateProfileImagePath(mSeq, imagePath);
                return "SUCCESS";
            } catch (Exception e) {
                e.printStackTrace();
                return "FAILURE";
            }
        } else {
            return "SAVE_FAILURE";
        }
    }
    
   
}