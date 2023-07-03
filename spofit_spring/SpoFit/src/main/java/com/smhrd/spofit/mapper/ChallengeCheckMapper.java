package com.smhrd.spofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.spofit.domain.ChallengeCheck;

@Mapper
public interface ChallengeCheckMapper {

	
	//커스텀 체크리스트 삽입
	public int saveCheckList(int chal_num, String chal_context, int cus_seq);
	
	//커스텀 챌린지 로드
	@Select("select * from t_custom_checklist where cus_seq=${chal_seq}")
	public List<ChallengeCheck> loadCustomCheck(int chal_seq);
	
	//커스텀 챌린지 로드
	@Select("select * from t_checklist where chal_seq=${chal_seq}")
	public List<ChallengeCheck> loadCheck(int chal_seq);
	
	//챌린지 리스트 로드
//	@Select("select * from t_checklist where chal_seq=${chal_seq}")
//	public List<ChallengeCheck> loadChallengeCheck(int chal_seq);
	
	//커스텀 체크리스트 초기화
	@Delete("delete from t_custom_checklist where cus_seq=${cus_seq}")
	public void deleteCheckList(int cus_seq);
	
	//공유 체크리스트 삽입
	public int shareCheckList(int chal_num, String chal_context, int chal_seq);
}
