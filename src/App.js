import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import service from './service.js';

const App = observer(() => {
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        service.initTodos();
    }, []);

    async function createTodo(e) {
        e.preventDefault();
        await service.addTodo(newTodo);
        setNewTodo("");
    }

    async function updateCompleted(todo, isComplete) {
        await service.updateCompleted(todo.id, isComplete);
    }

    async function deleteTodo(id) {
        await service.deleteTodo(id);
    }

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
                    {service.getTodos.map(todo => {
                        return (
                            <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                                <div className="view">
                                    <input className="toggle" type="checkbox" checked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
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
});

export default App;
