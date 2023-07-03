package com.smhrd.spofit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.smhrd.spofit.domain.Diary;

@Mapper
public interface DiaryMapper {

	
	@Select("select * from t_diary where doing_seq = ${doing_seq}")
	public List<Diary> loadDiary(Diary diary);
	
	@Insert("insert into t_diary (doing_seq, diary_dt, diary_context, diary_title) values (${doing_seq}, '${diary_dt}', '${diary_context}', '${diary_title}')")
	public int saveDiary(Diary diary);
}
