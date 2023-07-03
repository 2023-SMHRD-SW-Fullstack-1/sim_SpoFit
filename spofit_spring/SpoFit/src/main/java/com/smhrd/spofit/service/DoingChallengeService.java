package com.smhrd.spofit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.spofit.domain.DoingChallenge;
import com.smhrd.spofit.mapper.DoingChallengeMapper;

@Service
public class DoingChallengeService {

	@Autowired 
	private DoingChallengeMapper mapper;
	
	
	
	//수행중인 챌린지 하나 불러오기
	
	public DoingChallenge selectDoing(DoingChallenge doChall) {
		DoingChallenge result = mapper.selectDoing(doChall);
		return result;
	}
}
