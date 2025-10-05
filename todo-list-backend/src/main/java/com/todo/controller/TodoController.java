package com.todo.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todo.domain.Todo;
import com.todo.service.spec.ITodoService;

@RestController
@RequestMapping({"", "/"})
public class TodoController {
	
	@Autowired
	private ITodoService service;

    @GetMapping
    public ResponseEntity<List<Todo>> list() {
        List<Todo> todos = service.getAll();
        return ResponseEntity.ok(todos);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Todo>> searchByTask(@RequestParam String task) {
        List<Todo> todos = service.getByTask(task);
        return ResponseEntity.ok(todos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        service.removeById(id);
        return ResponseEntity.ok(Collections.singletonMap("success", "Todo deleted"));
    }

}
