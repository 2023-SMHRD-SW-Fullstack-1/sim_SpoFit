package com.smhrd.spofit.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Diary {

	private int doing_seq;
	private int diary_seq;
	private Date diary_dt;
	private String diary_context;
	private String diary_title;
	private List<Diary> diaryList;
}
