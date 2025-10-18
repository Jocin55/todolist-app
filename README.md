TodoList App

A full-stack Todo List application built with React (frontend) and Node.js + Express (backend). Users can add, edit, delete, and view tasks with details such as status, priority, start date, and end date.

Features
Add new tasks with description, priority, and dates
Edit existing tasks
Delete tasks
View all tasks in a neat dashboard
Data persisted in todos.json (backend)
Responsive and modern UI with Bootstrap

Prerequisites
Node.js (v16+),
npm

How to Test

Open http://localhost:3000 in your browser.

Add a Task:
Click Add To-Do
Fill in the task details and submit

View Tasks:
Go to My Tasks page
See all tasks with their status, priority, and dates

Edit a Task:
Click the Edit button on a task card
Update details and save

Delete a Task:
Click the Delete button on a task card
Confirm deletion

Data Persistence:
Tasks are saved in backend/todos.json
Even after restarting the backend, tasks remain

Notes
Make sure the backend is running before using the frontend
Uses local JSON file storage, no database required
Example tasks can be added manually in todos.json for testing
