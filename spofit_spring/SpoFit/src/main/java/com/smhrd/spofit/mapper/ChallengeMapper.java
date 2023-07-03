package com.smhrd.spofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.spofit.domain.Challenge;

@Mapper
public interface ChallengeMapper {

	//기존 cus_chal 업데이트 하기
	public int updateCusChallenge(Challenge challenge);
	
	//새로운 cus_challenge 생성하기
	public int createCusChallenge(Challenge challenge);
	
	//커스텀 챌린지 정보 불러오기
	@Select("select * from t_custom where cus_seq =${chal_seq}")
	public Challenge loadCusChallenge(int chal_seq);
	
	//챌린지 정보 불러오기
	@Select("select * from t_challenge where chal_seq =${chal_seq}")
	public Challenge loadChallenge(int chal_seq);
	
	//챌린지 cus_seq를 얻기위해 조회 => 최근 추가한 값 cus_seq가 가장큰 값 불러오기
	@Select("select max(cus_seq) from t_custom where cus_title='${chal_title}' and cus_doc='${chal_doc}' and cus_gdt=${chal_gdt} and m_seq=${m_seq}")
	public int checkChallenge(Challenge challenge);
	
	//수행중인 챌린지 목록 불러오기 ( 완료 X ) 
	@Select("select * from t_challenge where chal_seq in(select chal_seq from t_doing where m_seq='${m_seq}' and chal_done_yn='N') order by chal_dt desc")
	public List<Challenge> doingList(int m_seq);
	
	//공유된 챌린지 목록 불러오기
	@Select("select * from t_challenge where share_yn ='Y'")
	public List<Challenge> sharedList();
	
	//수행중인 챌린지 목록 불러오기 ( 완료  ) 
	@Select("select * from t_challenge where chal_seq in(select chal_seq from t_doing where m_seq='${m_seq}' and chal_done_yn='Y')")
	public List<Challenge> doneList(int m_seq);
	
	//커스텀 저장소에서 리스트 불러오기
	@Select("select * from t_custom where m_seq = ${m_seq} order by cus_seq desc")
	public List<Challenge> saveList(int m_seq);

	//공유 챌린지에 등록하기
	@Insert("insert into t_challenge (chal_title, chal_context, chal_goal_dt, chal_likes, m_seq, chal_dt, share_yn) values ('${chal_title}', '${chal_doc}', ${chal_gdt}, 0, ${m_seq}, sysdate, '${share_yn}')")
	public int shareChallenge(Challenge challenge);
	
	// 공유하여 추가한 챌린지 Seq 값 찾기
	@Select("select chal_seq from t_challenge where chal_title = '${chal_title}' and m_seq = ${m_seq} and chal_dt = (select max(chal_dt) from t_challenge)")
	public int checkShareSeq(Challenge challenge);
	
	//수행 챌린지에 등록하기
	@Insert("insert into t_doing (m_seq, chal_seq, chal_sdt, chal_edt, chal_done_yn) values(${m_seq}, ${chal_seq}, sysdate, sysdate+${chal_gdt}, 'N')")
	public int addDoing(int m_seq, int chal_seq, int chal_gdt);
	
	@Select("SELECT * FROM (SELECT * FROM t_challenge where share_yn='Y' ORDER BY chal_likes DESC) WHERE ROWNUM <= 5")
	public List<Challenge> loadLikeList();
}
