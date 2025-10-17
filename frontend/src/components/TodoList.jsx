import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TodoList({ todos, fetchTodos }) {
  const navigate = useNavigate();

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleSection = async (id) => {
    const todo = todos.find(t => t._id === id); 
    try {
      await axios.put(`/api/todos/${id}`, { 
        ...todo, 
        completed: !todo.completed 
      });
      fetchTodos(); 
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <input type="checkbox"  checked={todo.completed}  onChange={() => toggleSection(todo._id)} />
            <span style={{ marginLeft: '0.5rem', marginRight: '1rem' }}> {todo.name} - {todo.status} </span>
            <button onClick={() => navigate(`/edit/${todo._id}`)} style={{ marginRight: '0.5rem' }}> Edit</button>
            <button onClick={() => deleteTodo(todo._id)}> Delete </button>
          </li> ))}
      </ul>
    </div>
  );
}

export default TodoList;
