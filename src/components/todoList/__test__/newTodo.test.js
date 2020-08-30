import React from 'react';
// import { render } from '@testing-library/react';

import { renderWithRouter } from 'utils/testRenderers';

import {NewTodo} from '../newTodo';
import todos from './todos';
import { waitFor } from '@testing-library/react';

describe('NewTodo', () => {
	test('creates a new todo: calling addTodo will give new id', async () => {
		const callback = jest.fn();
		const lastItemId = todos[todos.length - 1].id;
		const {history, rerender} = renderWithRouter(<NewTodo lastTodoItemId={1} addTodo={callback} />)

		expect(callback).toBeCalledWith({title: 'Untitled', notes: ''});

		rerender(<NewTodo lastTodoItemId={lastItemId} addTodo={callback} />);

		await waitFor(() => {
			expect(history.location.pathname).toContain(lastItemId);
		});
	})
});