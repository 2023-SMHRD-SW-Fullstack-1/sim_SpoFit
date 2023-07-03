package com.smhrd.spofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.spofit.domain.DoingChallenge;
import com.smhrd.spofit.service.ChallengeService;
import com.smhrd.spofit.service.DoingChallengeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DoingChallengeController {

	@Autowired
	private DoingChallengeService service;
	@Autowired
	private ChallengeService challengeService;
	
	
	//수행중인 챌린지 하나 불러오기 
	
	@PostMapping("/doingchallenge/select")
	public DoingChallenge selectDoing(@RequestBody DoingChallenge doChall) {
		System.out.println("진입성공"); 
		System.out.println(doChall.getChal_seq()+"+"+ doChall.getM_seq());
		DoingChallenge result = service.selectDoing(doChall);
		result.setChallenge(challengeService.loadChallenge(doChall.getChal_seq()));
		return result;
	}
}
