package com.smhrd.spofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.spofit.domain.Diary;
import com.smhrd.spofit.service.DiaryService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {

	
	@Autowired
	private DiaryService service;
	
	@PostMapping("/diary/loaddiary")
	public List<Diary> loadDiary(@RequestBody Diary diary) {
		//받는 값 = doing_seq
		System.out.println("loadDiary :" + diary.getDoing_seq());
		return service.loadDiary(diary);
	}
	
	@PostMapping("/diary/savediary")
	public int saveDiary(@RequestBody Diary diary) {
		System.out.println(diary.getDiary_dt());
		int result = service.saveDiary(diary);
		System.out.println(result);
		return result;
	}
}
