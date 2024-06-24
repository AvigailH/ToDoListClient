import { makeObservable, observable, action, runInAction } from 'mobx';

const apiUrl = 'https://app-5cedf3e4-31df-4667-8c0a-403aa64092f3.cleverapps.io';

class Service {
    todos = [];

    constructor() {
        makeObservable(this, {
            todos: observable,
            setTodos: action,
            addTodo: action,
            initTodos: action
        });
        this.initTodos();
    }

    async initTodos() {
        console.log('Fetching todos...');
        try {
            const response = await fetch(`${apiUrl}/items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                runInAction(() => {
                    this.setTodos(data);
                });
            } else {
                console.error('Failed to fetch todos');
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    setTodos(data) {
        this.todos = data;
    }

    async addTodo(name) {
        console.log('Creating new todo:', name);
        try {
            const response = await fetch(`${apiUrl}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name })
            });
            if (response.ok) {
                const data = await response.json();
                runInAction(() => {
                    this.todos.push(data);
                });
            } else {
                console.error('Failed to add todo');
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    }

    async updateCompleted(id, isComplete) {
        console.log(`Updating todo ${id} to ${isComplete ? 'complete' : 'incomplete'}`);
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ isComplete })
            });
            if (response.ok) {
                const data = await response.json();
                runInAction(() => {
                    const todo = this.todos.find(todo => todo.id === id);
                    if (todo) {
                        todo.isComplete = isComplete;
                    }
                });
            } else {
                console.error('Failed to update todo');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    async deleteTodo(id) {
        console.log(`Deleting todo ${id}`);
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                runInAction(() => {
                    this.todos = this.todos.filter(todo => todo.id !== id);
                });
            } else {
                console.error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    get getTodos() {
        return this.todos;
    }
}

const service = new Service();
export default service;
