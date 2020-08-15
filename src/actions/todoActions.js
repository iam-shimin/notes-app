import {CREATE_TODO, DELETE_TODO, SET_TODO_FIELD} from './todoTypes';

export function addTodo(todo) {

	const todoWithId = {...todo, id: Date.now() + Math.floor(Math.random() * 500)};
	
	return {
		type: CREATE_TODO,
		payload: todoWithId
	}
}

export function deleteTodo(id) {
	return {
		type: DELETE_TODO,
		payload: id
	}
}

export function setTodoField(id, field, value) {
	return {
		type: SET_TODO_FIELD,
		payload: { id, field, value }
	}
}