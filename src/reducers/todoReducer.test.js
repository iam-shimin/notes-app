import reducer from './todoReducer';
import { CREATE_TODO, DELETE_TODO, SET_TODO_FIELD } from 'actions/todoTypes';
import { sampleTodos } from 'utils/__mocks__/dummyData';

const [todo] = sampleTodos;

const payloads = {
	[CREATE_TODO]: todo,
	[DELETE_TODO]: [todo.id],
	[SET_TODO_FIELD]: { id: todo.id, field: 'notes', value: '...'}
}

describe('todo reducer', () => {
	test.each([
		[CREATE_TODO],
		[DELETE_TODO],
		[SET_TODO_FIELD]
	])('action', (actionType) => {
		reducer(sampleTodos, {
			type: actionType,
			payload: payloads[actionType]
		})
	})
})