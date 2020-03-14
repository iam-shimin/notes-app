const CREATE = 'TODO_CREATE';
const UPDATE = 'TODO_UPDATE';
const DELETE = 'TODO_DELETE';

function createTodo(payload) {
	return {
		type: CREATE,
		payload
	}
}

function updateTodo(updates) {
	return {
		type: UPDATE,
		payload: updates
	}
}

function deleteTodo(id) {
	return {
		type: DELETE,
		id
	}
}

export default {
	createTodo,
	updateTodo,
	deleteTodo,
	TYPES: {CREATE, UPDATE, DELETE}
}