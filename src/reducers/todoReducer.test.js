import reducer from './todoReducer';
import { CREATE_TODO, DELETE_TODO, SET_TODO_FIELD } from 'actions/todoTypes';
import { sampleTodos } from 'utils/__mocks__/dummyData';

const [todo] = sampleTodos;

const payloads = {
	[CREATE_TODO]: todo,
	[DELETE_TODO]: [todo.id],
	[SET_TODO_FIELD]: { id: todo.id, field: 'notes', value: '...'}
}

const expectations = {
	[CREATE_TODO]: [...sampleTodos, todo ],
	[DELETE_TODO]: sampleTodos.filter(t => t.id !== todo.id),
	[SET_TODO_FIELD]: sampleTodos.map(t => t.id === todo.id? { ...todo, notes: '...' }: t)
}

describe('todo reducer', () => {
	test.each([
		[CREATE_TODO],
		[DELETE_TODO],
		[SET_TODO_FIELD]
	])('%s action', (actionType) => {
		const state = reducer(sampleTodos, {
			type: actionType,
			payload: payloads[actionType]
		});

		expect(state).toStrictEqual(expect.arrayContaining(expectations[actionType]));
	})
})