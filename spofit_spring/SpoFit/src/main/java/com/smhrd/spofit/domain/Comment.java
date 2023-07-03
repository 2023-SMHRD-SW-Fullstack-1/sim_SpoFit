package com.smhrd.spofit.domain;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Comment {
	
	private int cmt_seq;
	private String cmt_context;
	private Date cmt_dt;
	private int b_seq;
	private int m_seq;
	private String m_nick;
}
