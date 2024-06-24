import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);

    async function getTodos() {
        console.log('Fetching todos...');
        try {
            const todos = await service.getTasks();
            setTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    async function createTodo(e) {
        e.preventDefault();
        console.log('Creating new todo:', newTodo);
        try {
            await service.addTask(newTodo);
            setNewTodo("");
            await getTodos();
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    }

    async function updateCompleted(todo, isComplete) {
        console.log(`Updating todo ${todo.id} to ${isComplete ? 'complete' : 'incomplete'}`);
        try {
            await service.setCompleted(todo.id, isComplete);
            await getTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    async function deleteTodo(id) {
        console.log(`Deleting todo ${id}`);
        try {
            await service.deleteTask(id);
            await getTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={createTodo}>
                    <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                </form>
            </header>
            <section className="main" style={{ display: "block" }}>
                <ul className="todo-list">
                    {todos.map(todo => {
                        return (
                            <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                                <div className="view">
                                    <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                                    <label>{todo.name}</label>
                                    <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </section>
    );
}

export default App;
