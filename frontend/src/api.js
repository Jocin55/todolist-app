import axios from 'axios';

const BASE = '/api/todos';

// ✅ Fetch all todos
export async function fetchTodos() {
  try {
    const res = await axios.get(BASE);
    return res.data;
  } catch (e) {
    const raw = localStorage.getItem('todos');
    return raw ? JSON.parse(raw) : [];
  }
}

// ✅ Create a new todo
export async function createTodo(todo) {
  try {
    const res = await axios.post(BASE, todo);
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

// ✅ Update an existing todo
export async function updateTodo(id, updates) {
  try {
    const res = await axios.put(`${BASE}/${id}`, updates);
    return res.data;
  } catch (e) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const idx = todos.findIndex((t) => t.id === id);
    if (idx !== -1) {
      todos[idx] = { ...todos[idx], ...updates };
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos[idx];
    }
    throw e;
  }
}

// ✅ Delete a todo
export async function deleteTodo(id) {
  try {
    await axios.delete(`${BASE}/${id}`);
    return { success: true };
  } catch (e) {
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos = todos.filter((t) => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    return { success: true };
  }
}
