// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;


const DATA_FILE = path.join(__dirname, 'todos.json');


app.use(cors());
app.use(express.json());


function readTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (e) {
    return [];
  }
}

function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

app.get('/api/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});


app.post('/api/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = { id: uuidv4(), ...req.body };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});


app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  todos[idx] = { ...todos[idx], ...req.body };
  writeTodos(todos);
  res.json(todos[idx]);
});


app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  let todos = readTodos();
  if (!todos.some(t => t.id === id)) return res.status(404).json({ message: 'Not found' });
  todos = todos.filter(t => t.id !== id);
  writeTodos(todos);
  res.json({ message: 'Deleted' });
});


app.use(express.static(path.join(__dirname, 'frontend','build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend','build', 'index.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
