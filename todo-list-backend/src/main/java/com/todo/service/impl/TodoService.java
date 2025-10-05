package com.todo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todo.dao.ITodoDao;
import com.todo.domain.Todo;
import com.todo.service.spec.ITodoService;

@Service
@Transactional(readOnly = false)
public class TodoService implements ITodoService {

    @Autowired
	ITodoDao dao;

    public List<Todo> getAll() {
        return dao.findAll();
    }

    public List<Todo> getByTask(String task) {
        return dao.findByTaskContainingIgnoreCase(task);
    }

	public void persist(Todo todo) {
        try {
            dao.save(todo);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error saving Todo", e);
        }
    }

	public void removeById(Integer id) {
        try {
            dao.deleteById(id);
        } catch (DataAccessException e) {
            throw new RuntimeException("Error deleting Todo - Todo with ID " + id + " not found.", e);
        }
    }
    
}
