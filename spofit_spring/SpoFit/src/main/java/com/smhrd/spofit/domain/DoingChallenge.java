package com.smhrd.spofit.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DoingChallenge {
	private int chal_seq;
	private int doing_seq;
	private int m_seq;
	private Date chal_sdt;
	private Date chal_edt;
	private char chal_done_yn;
	private Challenge challenge;
}
