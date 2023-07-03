package com.smhrd.spofit.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.spofit.domain.DoingChallenge;

@Mapper
public interface DoingChallengeMapper {

	
	//수행중인 챌린지 하나 불러오기 
	
	@Select("select * from t_doing where m_seq=#{m_seq} and chal_seq =#{chal_seq}")
	public DoingChallenge selectDoing(DoingChallenge doChall);
}
