import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyTasks from './MyTasks';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <h1>Welcome to My Todo App</h1>
      <p>Organize your tasks, And Complete it Before it becomes an Headache.</p>
      <div className="hero-buttons">
        <button className="primary-btn" onClick={() => navigate('/add')}> Create New Task</button>
        <button className="secondary-btn" onClick={() => navigate('/view')}> View My Tasks</button>
      </div>
    </section>
  );
}

export default Hero;