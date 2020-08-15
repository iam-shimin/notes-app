import {CREATE_TODO, DELETE_TODO, SET_TODO_FIELD} from 'actions/todoTypes';

const initialTodos = [];

export default function todoReducer(state = initialTodos, action) {
	switch (action.type) {

		case CREATE_TODO:
			return [...state, action.payload];

		case DELETE_TODO:
			return state.filter(todo => todo.id !== action.payload);

		case SET_TODO_FIELD:
			const {id, field, value} = action.payload;
			return state.map(todo => {
				if (todo.id === id) {
					return {...todo, [field]: value}
				}
				return todo;
			});

		default:
			return state;

	}
}