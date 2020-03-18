import React, { createContext, useState } from 'react';


export const TodoContext = createContext();

export default TodoContext.Consumer;

export function TodoProvider(props) {
	// const sample = {
	// 	todosById: {
	// 		id1: {
	// 			title: String,
	// 			notes: String,
	// 			checkpoints: [String, 'priority'],
	// 			status: '%',
	// 			priority: ['low', 'med', 'high'],
	// 			dateAdded: Date,
	// 			dateModified: Date,
	// 			lastChecked: Date,
	//			dueDate: Date,
	// 			checkFrequency: Number
	// 		}
	// 	},
	// 	lastAdded: 'id',
	// 	mostChecked: 'id',
	// 	lastChecked: 'id',
	// 	count: {
	// 		current: Number,
	// 		done: Number,
	// 		deleted: Number
	// 	}
	// }

	const [todoData, _setTodoData] = useState(JSON.parse(localStorage.getItem('todos')) || [
		{ id: 0, title: 'demo', notes: 'deom nothing much' }
	]);

	function setTodoData(data) {
		localStorage.setItem('todos', JSON.stringify(data))
		_setTodoData(data);
	}

	function addTodo(todo) {
		todo.id = Date.now();
		setTodoData(todoData.concat([todo]));
		return todo;
	}

	const todoExists = id => todoData.find(todo => todo.id === id)

	const deleteTodo = id => setTodoData(todoData.filter(todo => todo.id !== id))

	const setTodoField = (id, field, value) => setTodoData(todoData.map(todo => {
		if (todo.id === id) {
			todo[field] = value;
		}
		return todo;
	}));

	return (
		<TodoContext.Provider value={{ todoData, todoExists, addTodo, deleteTodo, setTodoField }}>
			{props.children}
		</TodoContext.Provider>
	);
}