import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteTodo } from '../api'; 

function MyTasks() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:5000/api/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      const localData = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(localData);
    }
  };

 
const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const response = await deleteTodo(id);
      if (response.success) {
        alert('Task deleted successfully!');
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: '#51101f' }}>My Tasks <FontAwesomeIcon icon={faBookBookmark}/></h2>
      {todos.length === 0 ? (
        <p className="text-center fw-bold">No tasks yet. Start adding one!!</p>
      ) : (
        <div className="row">
          {todos.map((todo) => (
            <div key={todo._id} className="col-md-6 mb-3">
              <div className="card shadow p-3 rounded-4 border-0" >
                <h5 className="fw-bold"style={{color:"brown"}}>{todo.name}</h5>
                <p>{todo.description}</p>
                <p><strong>Progress Status:</strong> {todo.status} | <strong>Priority Level:</strong>{' '}{todo.priority}</p>
                <p>
                  <strong>Start date:</strong> {todo.startDate || 'Not mentioned'} |{' '}
                  <strong>End date:</strong> {todo.endDate || 'Not Mentioned'}
                </p>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/edit/${todo.id}`)}>
                    <FontAwesomeIcon icon={faPenToSquare} />Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(todo.id)}><FontAwesomeIcon icon={faTrash}/> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTasks;
