package com.todo.service.spec;

import java.util.List;

import com.todo.domain.Todo;

public interface ITodoService {

	List<Todo> getAll();

	void persist(Todo todo);

	void removeById(Integer id);
    
}
