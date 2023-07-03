package com.smhrd.spofit.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChallengeCheck {
	private int cus_seq;
	private int chal_num;
	private String chal_context;
	private int cus_check_seq;
	private int check_seq;
	private int check_num;
	private String check_context;
	private String cus_context;
}
