package com.assignment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.execption.TaskException;
import com.assignment.model.Task;
import com.assignment.repo.TaskRepo;
@Service
public class TaskServiceImpl  implements TaskService{
	@Autowired
	private TaskRepo taskRepo;
	
	
	@Override
	public List<Task> getAllTask() {
		
		return taskRepo.findAll();
	}

	@Override
	public Task registerTask(Task task) {
		
		return taskRepo.save(task);
	}

	@Override
	public Task deleteTask(String taskId) throws TaskException {
		
		 Optional<Task> optionalTask= taskRepo.findById(taskId);
		 if(optionalTask.isEmpty()) {
			 throw new TaskException("Task not found");
		 }
		 
		 taskRepo.delete(optionalTask.get());
		 return optionalTask.get();
	}

	@Override
	public Task updateTask(Task task) throws TaskException {
		 Optional<Task> optionalTask= taskRepo.findById(task.getId());
		 if(optionalTask.isEmpty()) {
			 throw new TaskException("Task not found");
		 }
		 return taskRepo.save(task);
	}

}
