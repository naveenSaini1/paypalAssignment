package com.assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.execption.TaskException;
import com.assignment.model.Task;
import com.assignment.service.TaskService;



@RestController
public class TaskController {
	@Autowired
	private TaskService taskService;
	
	// allTask
	// addTask
	// deleteTaskById
	// updateTsak
	
	@GetMapping("/allTask")
	public ResponseEntity<List<Task>> getAllTask(){
		return new ResponseEntity<List<Task>>(taskService.getAllTask(),HttpStatus.OK);
	}
	@PostMapping("/addTask")
	public ResponseEntity<Task> addTask(@RequestBody Task Task){
		return new ResponseEntity<Task>(taskService.registerTask(Task),HttpStatus.OK);
	}
	
	@DeleteMapping("deleteTaskById/{id}")
	public ResponseEntity<Task> deleteTask(@PathVariable("id") String id) throws TaskException{
		return new ResponseEntity<Task>(taskService.deleteTask(id),HttpStatus.OK);
	}
	@PutMapping("/addTask")
	public ResponseEntity<Task> updateTask(@RequestBody Task Task) throws TaskException{
		return new ResponseEntity<Task>(taskService.updateTask(Task),HttpStatus.OK);
	}
	
	
	
	

}
