package com.assignment.execption;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(TaskException.class)
	public ResponseEntity<Details> TaskExecption(TaskException e) {
		
		return new ResponseEntity<Details>(new Details(e.getMessage(),LocalDate.now()),HttpStatus.BAD_GATEWAY);
		
	}
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Details> globalExecption(Exception e) {
		
		return new ResponseEntity<Details>(new Details(e.getMessage(),LocalDate.now()),HttpStatus.BAD_GATEWAY);
		
	}
}
