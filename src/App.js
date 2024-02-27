import React, { useState } from 'react';
import './App.css';

function TodoCard({ todo, onDelete, onUpdateStatus }) {
  return (
    <div className={`todo-card ${todo.status}`}>
      <h3>{todo.taskName}</h3>
      <p className="description">{todo.description}</p>
      <div className="btn-group">
        <button className="status-btn" onClick={() => onUpdateStatus(todo.id, todo.status === 'completed' ? 'not completed' : 'completed')}>
          {todo.status === 'completed' ? 'Mark Not Completed' : 'Mark Completed'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addTodo = () => {
    if (!taskName.trim()) return;
    const newTodo = {
      id: Date.now(),
      taskName,
      description,
      status: 'not completed',
    };
    setTodos([...todos, newTodo]);
    setTaskName('');
    setDescription('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateStatus = (id, status) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status };
      }
      return todo;
    }));
  };

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'all') {
      return todo.taskName.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return todo.status === filterStatus && todo.taskName.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="todo-form">
        <input
          type="text"
          placeholder="Enter Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search Todos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select className="filter" onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not completed">Not Completed</option>
      </select>

      <div className="todo-list">
        {filteredTodos.map(todo => (
          <TodoCard key={todo.id} todo={todo} onDelete={deleteTodo} onUpdateStatus={updateStatus} />
        ))}
      </div>
    </div>
  );
}

export default App;
