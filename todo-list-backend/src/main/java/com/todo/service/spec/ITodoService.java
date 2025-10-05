package com.todo.service.spec;

import java.util.List;

import com.todo.domain.Todo;

public interface ITodoService {

	List<Todo> getAll();

    List<Todo> getByTask(String task);

	void persist(Todo todo);

	void removeById(Integer id);
    
}
