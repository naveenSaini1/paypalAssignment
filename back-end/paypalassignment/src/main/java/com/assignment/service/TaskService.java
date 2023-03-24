package com.assignment.service;

import java.util.List;

import com.assignment.execption.TaskException;
import com.assignment.model.Task;

public interface TaskService {
	public List<Task> getAllTask();
	public Task registerTask(Task task);
	public Task deleteTask(String taskId) throws TaskException ;
	public Task updateTask(Task task)  throws TaskException;
	

}
