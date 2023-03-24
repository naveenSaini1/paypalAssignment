package com.assignment.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.assignment.model.Task;
@Repository
public interface TaskRepo extends JpaRepository<Task, String> {
		
}
