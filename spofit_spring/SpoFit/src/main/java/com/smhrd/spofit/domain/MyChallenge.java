package com.smhrd.spofit.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MyChallenge {
	private int doing_seq;
	private int m_seq;
	private int chal_seq;
	private String chal_sdt;
	private String chal_edt;
	private char chal_done_yn;
}
