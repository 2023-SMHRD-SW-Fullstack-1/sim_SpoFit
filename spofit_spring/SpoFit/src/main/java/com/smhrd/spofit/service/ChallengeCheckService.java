package com.smhrd.spofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.spofit.domain.Challenge;
import com.smhrd.spofit.domain.ChallengeCheck;
import com.smhrd.spofit.mapper.ChallengeCheckMapper;


@Service
public class ChallengeCheckService {

	@Autowired
	private ChallengeCheckMapper mapper;
	
	public int saveCheckList(List<ChallengeCheck> checkList, int cus_seq) {
		int cnt=0;
		//챌린지가 있는지 확인x -> 싹다 삭제하고 다시 입력 하면됨
		mapper.deleteCheckList(cus_seq);
		//이후 반복해서 입력한 데이터 insert 
		System.out.println("체크리스트 존재 확인 : " + checkList);
		for(int i=0; i<checkList.size(); i++) {
			cnt += mapper.saveCheckList(checkList.get(i).getChal_num(), checkList.get(i).getChal_context(), cus_seq);
		}
		return cnt;
	}
	
	//커스텀 리스트를 가져오는 거
	public List<ChallengeCheck> loadCustomCheck(int chal_seq) {
		List<ChallengeCheck> resultChallengeCheck = mapper.loadCustomCheck(chal_seq);
		return resultChallengeCheck;
	}
	
	public int shareCheckList(List<ChallengeCheck> checkList, int chal_seq) {
		int result = 0;
		for(int i=0; i<checkList.size(); i++) {
			result += mapper.shareCheckList(checkList.get(i).getChal_num(), checkList.get(i).getChal_context(), chal_seq);
		}
		return result;
	}
}
