package com.smhrd.spofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.spofit.domain.Challenge;
import com.smhrd.spofit.service.ChallengeCheckService;
import com.smhrd.spofit.service.ChallengeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeController {

	@Autowired
	private ChallengeService service;
	@Autowired
	private ChallengeCheckService checkService;
	//챌린지와 관련된 작업은 여기서 수행하시오
	// ex ) 챌린지 생성, 챌린지 가져오기, 챌린지 저장하기 등등
	
	@PostMapping("/challenge/savechallenge")
	public int saveChallenge(@RequestBody Challenge challenge) {
		//cnt 에서 cus_seq를 담아올 수 있게끔 service작성
		int cnt = service.saveChallenge(challenge);
		int result = 0;
		if(cnt>0) {
			result = checkService.saveCheckList(challenge.getChallengeList(), cnt);
		}
		return result>0 ? cnt : 0;
	}
	
	//선택한 커스텀 챌린지 정보 가져오기
	@GetMapping("/challenge/loadcuschallenge")
	public Challenge loadCusChallenge(@RequestParam("chal_seq") int chal_seq) {
		return service.loadCusChallenge(chal_seq);
	}
	
	//선택한 챌린지 정보 가져오기
	@GetMapping("/challenge/loadchallenge")
	public Challenge loadChallenge(@RequestParam("chal_seq") int chal_seq) {
		return service.loadChallenge(chal_seq);
	}
	
	//수행중인 리스트 가져오기
	@GetMapping("/challenge/doinglist")
	public List<Challenge> doingList(@RequestParam("m_seq") int m_seq){
		 List<Challenge> doingList = service.doingList(m_seq);
		return doingList;
	}
	
	//공유된 리스트 가져오기
	@GetMapping("/challenge/sharedlist")
	public List<Challenge> sharedList(){
		List<Challenge> sharedList = service.sharedList();
		return sharedList;
	}
	
	//수행 완료한 리스트 가져오기
	@GetMapping("/challenge/donelist")
	public List<Challenge> doneList(@RequestParam("m_seq") int m_seq){
		List<Challenge> doneList = service.doneList(m_seq);
		return doneList;
	}
	//커스텀 보관함 리스트 가져오기
	@GetMapping("/challenge/savelist")
	public List<Challenge> saveList(@RequestParam("m_seq") int m_seq){
		List<Challenge> saveList = service.saveList(m_seq);
		return saveList;
	}
	
	@PostMapping("/challenge/sharechallenge")
	public int shareChallenge(@RequestBody Challenge challenge) {
		int result = service.shareChallenge(challenge);
		int cnt = 0;
		if(result>0) {
			cnt = checkService.shareCheckList(challenge.getChallengeList(), result);
			System.out.println("리스트 삽입 :" + cnt);
		}
		//챌린지에 저장되었는지 확인했음 -> t_doing에 추가해줄것
		if(result>0 && cnt>0) {
			int temp = service.addDoing(challenge.getM_seq(), result, challenge.getChal_gdt());
			System.out.println("doing 이전 여부 :" +temp);
			return temp;
		}
		return 0;
	}
	
	
	@GetMapping("/main/likelist")
	public List<Challenge> loadLikeList() {
		List<Challenge> likeList = service.loadLikeList();
		return likeList;
		
	}
}
