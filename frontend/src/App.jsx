import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar.jsx'; 
import Hero from './components/Hero.jsx';
import TodoList from './components/TodoList.jsx';
import TodoForm from './components/TodoForm.jsx';
import '../src/App.css';
import MyTasks  from './components/MyTasks.jsx';

function App() {
  const [todos, setTodos] = useState([]);
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

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={ <><Hero /></>}/>
          <Route path="/add" element={<TodoForm fetchTodos={fetchTodos} />}/>
          <Route path="/edit/:id" element={<TodoForm fetchTodos={fetchTodos} />}/>
          <Route path="/view" element={<MyTasks />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
