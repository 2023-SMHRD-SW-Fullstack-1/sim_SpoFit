package com.smhrd.spofit.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.smhrd.spofit.domain.ChallengeCheck;
import com.smhrd.spofit.service.ChallengeCheckService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeCheckController {

	@Autowired
	private ChallengeCheckService service;
	//챌린지 리스트 관련 데이터 처리 
	
	//Challenge에서 가공해서 checkservice 로 넘어갈 것임 
	
	
	
	//새로운 체크리스트를 저장할때 (근데, 어떻게 chal_seq와 연결할 것인가?)
//	@PostMapping("/challenge/savecheck")
//	public void saveCheckList(@RequestBody List<ChallengeCheck> checkList) {
//		System.out.println(checkList.get(0).getChal_context());
//		int cnt = service.saveCheckList(checkList);
//	}
//	
//	
//	//기존의 챌린지 정보를 가져올 때 (react에서 chal_seq정보 제공)
//	@GetMapping("/challenge/loadchallengecheck")
//	public void loadChallengeCheck(@RequestParam("chal_seq") int chal_seq) {
//		service.loadChallengeCheck(chal_seq);
//	}
	
	
}
