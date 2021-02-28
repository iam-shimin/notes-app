import reducer from './noteReducer';
import { CREATE_NOTE, DELETE_NOTE, SET_NOTE_FIELD } from 'actions/noteActionTypes';
import { sampleTodos } from 'utils/__mocks__/dummyData';
// TODO: rename to note
const [todo] = sampleTodos;

const payloads = {
	[CREATE_NOTE]: todo,
	[DELETE_NOTE]: [todo.id],
	[SET_NOTE_FIELD]: { id: todo.id, field: 'notes', value: '...' }
};

const expectations = {
	[CREATE_NOTE]: [...sampleTodos, todo],
	[DELETE_NOTE]: sampleTodos.filter(t => t.id !== todo.id),
	[SET_NOTE_FIELD]: sampleTodos.map(t =>
		t.id === todo.id ? { ...todo, notes: '...' } : t
	)
};

describe('todo reducer', () => {
	test.each([[CREATE_NOTE], [DELETE_NOTE], [SET_NOTE_FIELD]])(
		'%s action',
		actionType => {
			//@ts-ignore
			const state = reducer(sampleTodos, {
				//@ts-ignore
				type: actionType,//@ts-ignore
				payload: payloads[actionType]
			});

			expect(state).toStrictEqual(//@ts-ignore
				expect.arrayContaining(expectations[actionType])
			);
		}
	);
});
