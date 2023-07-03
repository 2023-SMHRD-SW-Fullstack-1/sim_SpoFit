package com.smhrd.spofit.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor	
public class Challenge {
	private int cus_seq;
	private int chal_seq;
	private String cus_title;
	private String chal_title;
	private int chal_gdt;
	private String chal_context;
	private String chal_doc;
	private String writer_nick;
	private int m_seq;
	private List<ChallengeCheck> challengeList;
	private String share_yn;
	private int chal_likes;
	private int cus_gdt;
	private String cus_doc;
	private int chal_goal_dt;
}
