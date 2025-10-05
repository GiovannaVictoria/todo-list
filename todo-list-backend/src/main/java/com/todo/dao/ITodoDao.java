package com.todo.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.todo.domain.Todo;

@SuppressWarnings("unchecked")
public interface ITodoDao extends CrudRepository<Todo, Integer> {
	
	List<Todo> findAll();

    List<Todo> findByTaskContainingIgnoreCase(String task);
	
	Todo save(Todo todo);

	void deleteById(Integer id);

}