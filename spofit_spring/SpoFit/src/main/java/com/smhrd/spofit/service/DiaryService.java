package com.smhrd.spofit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.spofit.domain.Diary;
import com.smhrd.spofit.mapper.DiaryMapper;

@Service
public class DiaryService {

	@Autowired
	private DiaryMapper mapper;
	
	
	public List<Diary> loadDiary(Diary diary){
		return mapper.loadDiary(diary);
	}
	
	
	public int saveDiary (Diary diary) {
		return mapper.saveDiary(diary);
	}
}
