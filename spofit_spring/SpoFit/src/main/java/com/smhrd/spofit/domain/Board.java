package com.smhrd.spofit.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Board {
	private int b_seq;
	private String b_title;
	private String b_content;
	private String m_nick;
	private Date b_dt;
	private int b_views;
	private int m_seq;
	private String b_file;
	private String b_type;
	private List<String> fileUrls;
	public void setFileUrls(List<String> fileUrls) {
		
		this.fileUrls = fileUrls;
	}

}
