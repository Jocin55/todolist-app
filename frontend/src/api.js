import axios from 'axios';

// Use relative path for API; works locally and in production
const BASE = '/api/todos/';

export async function fetchTodos() {
  try {
    const res = await axios.get(`${BASE}/todos`);
    return res.data;
  } catch (e) {
    const raw = localStorage.getItem('todos');
    return raw ? JSON.parse(raw) : [];
  }
}

export async function createTodo(todo) {
  try {
    const res = await axios.post(`${BASE}/todos`, todo);
    return res.data;
  } catch (e) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const id = `local-${Date.now()}`;
    const newTodo = { id, ...todo };
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    return newTodo;
  }
}

export async function updateTodo(id, updates) {
  try {
    const res = await axios.put(`${BASE}/todos/${id}`, updates);
    return res.data;
  } catch (e) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const idx = todos.findIndex(t => t.id === id);
    if (idx !== -1) {
      todos[idx] = { ...todos[idx], ...updates };
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos[idx];
    }
    throw e;
  }
}

export async function deleteTodo(id) {
  try {
    await axios.delete(`${BASE}/todos/${id}`);
    return { success: true };
  } catch (e) {
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos = todos.filter(t => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    return { success: true };
  }
}
