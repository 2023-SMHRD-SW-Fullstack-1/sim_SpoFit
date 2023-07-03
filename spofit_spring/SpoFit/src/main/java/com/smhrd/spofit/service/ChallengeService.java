package com.smhrd.spofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.spofit.domain.Challenge;
import com.smhrd.spofit.domain.ChallengeCheck;
import com.smhrd.spofit.mapper.ChallengeCheckMapper;
import com.smhrd.spofit.mapper.ChallengeMapper;
import com.smhrd.spofit.mapper.MemberMapper;

@Service
public class ChallengeService {

	@Autowired
	private ChallengeMapper mapper;
	@Autowired
	private ChallengeCheckMapper checkMapper;
	
	
	public int saveChallenge(Challenge challenge) {
		System.out.println(challenge.getCus_seq());
		
		if(challenge.getCus_seq()>0){
//			기존 커스텀 챌린지를 업데이트하는 경우 (cus_chal o)
			int updateResult = mapper.updateCusChallenge(challenge);
			return updateResult>0 ? challenge.getCus_seq() : 0; 
//		}else if(challenge.getWriter_nick()!=null) {
//			다른 제작자의 것으로 새로운 챌린지를(CUSTOM) 생성 하는 경우
//			return mapper.createChallenge(challenge); => 작성자가있으면 무조건 update로 행동됨
		}else {
//			본인이 직접 제작하여 새로운 챌린지를 생성하는 경우
			//수행 1, 새로 제작한 challenge의 수행번호를 알아야 할 필요가있음 
			int createResult = mapper.createCusChallenge(challenge);
			System.out.println(createResult);
			if(createResult > 0) {
				int newChallengeSeq = mapper.checkChallenge(challenge);
				return newChallengeSeq;
			}
			return 0;
		}
		//챌린지 리스트를 업데이트 해주어야함 ( 이때, cus_seq가 부여된 이후여야 하므로 서순 주의
	}
	
	//세션 정보로 커스텀 챌린지 가져오기 
	public Challenge loadCusChallenge(int chal_seq) {
		Challenge resultChallenge = mapper.loadCusChallenge(chal_seq);
		List<ChallengeCheck> list = checkMapper.loadCustomCheck(chal_seq);
		for(int i=0; i<list.size(); i++) {
			if(list.get(i).getCus_context()==null) {
				list.get(i).setCus_context(".");
			}
		}
		resultChallenge.setChallengeList(checkMapper.loadCustomCheck(chal_seq));
		return resultChallenge;
	}
	//세션 정보로 챌린지 가져오기 
	public Challenge loadChallenge(int chal_seq) {
		Challenge resultChallenge = mapper.loadChallenge(chal_seq);
		List<ChallengeCheck> list = checkMapper.loadCheck(chal_seq);
		for(int i=0; i<list.size(); i++) {
			if(list.get(i).getCheck_context()==null) {
				list.get(i).setCheck_context(".");
			}
		}
		resultChallenge.setChallengeList(checkMapper.loadCheck(chal_seq));
		return resultChallenge;
	}
	
	
	
	// 수행중인 챌린지 가져오기
	public List<Challenge> doingList(int m_seq){
		return mapper.doingList(m_seq);
	}
	// 공유된 챌린지 가져오기
	public List<Challenge> sharedList(){
		return mapper.sharedList();
	}
	
	// 수행완료한 챌린지 가져오기
	public List<Challenge> doneList(int m_seq){
		return mapper.doneList(m_seq);
	}
	
	// 커스텀 챌린지 보관함에서 가져오기
	public List<Challenge> saveList(int m_seq){
		return mapper.saveList(m_seq);
	}
	
	public int shareChallenge(Challenge challenge) {
		int result = mapper.shareChallenge(challenge);
		System.out.println("챌린지 insert 여부"+ result);
		if(result>0) {
			int shareChallengeSeq = mapper.checkShareSeq(challenge);
			System.out.println("공유 seq값" + shareChallengeSeq);
			return shareChallengeSeq;
		}
		return 0;
	}
	
	public int addDoing(int m_seq, int chal_seq, int chal_gdt) {
		int result = mapper.addDoing(m_seq, chal_seq, chal_gdt);
		return result;
	}
	
	public List<Challenge> loadLikeList() {
		return mapper.loadLikeList();
	}
}
