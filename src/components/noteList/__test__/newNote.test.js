import React from 'react';
import { waitFor } from '@testing-library/react';

import { renderWithRouter } from 'utils/testRenderers';

import { NewTodo } from '../newNote';

describe('NewTodo', () => {
	test('creates a new todo: calling addTodo will give new id', async () => {
		const callback = jest.fn((todo, cb) => cb({ id: 2, ...todo }));
		const { history } = renderWithRouter(
			<NewTodo totalCount={1} addNote={callback} />
		);

		expect(callback).toBeCalledWith(
			{ title: 'Untitled 2', notes: '' },
			expect.any(Function)
		);

		await waitFor(() => {
			expect(history.location.pathname).toContain('2');
		});
	});
});
