package com.smhrd.spofit.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@ResponseBody
public class TestController {

	@GetMapping("/")
	public String main() {
		
		return "test";
	}
}
