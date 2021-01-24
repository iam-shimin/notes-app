import React from 'react';
// import { render } from '@testing-library/react';
import { Note } from '../note';
import { createMemoryHistory } from 'history';
import dummyNotesList from './dummyNotesData';
import { renderWithStore, createMatch } from 'utils/testRenderers';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

jest.mock('utils/storage');

describe('<Note />', () => {
	test('content is not editable initially', () => {
		const { getByLabelText } = renderComponent();
		const title = getByLabelText(/title/i);

		expect(title).toBeDisabled();
	});

	test('"edit" toggle works', () => {
		const { getByRole, getByLabelText } = renderComponent();
		const title = getByLabelText(/title/i);
		const editButton = getByRole('button', { name: /edit/i });
		userEvent.click(editButton);

		expect(title).toBeEnabled();
	});

	test('"change priority" works', () => {
		const { getByRole, methods } = renderComponent();
		const prioritySelect = getByRole('combobox');
		fireEvent.change(prioritySelect, { target: { value: 'high' } }); // value should match options

		expect(methods.setNoteField).toBeCalledWith(
			expect.anything(),
			expect.anything(),
			'high'
		);
		// expect(prioritySelect).toHaveValue('high') // should rerender to do this
	});

	test('"delete" works', () => {
		const { getByRole, methods } = renderComponent();
		const deleteButton = getByRole('button', { name: /delete/i });
		userEvent.click(deleteButton);

		expect(methods.deleteNotes).toBeCalledWith(expect.arrayContaining([1]));
	});
});

function renderComponent() {
	const pushToast = jest.fn();
	const setNoteField = jest.fn();
	const deleteNotes = jest.fn();
	const history = createMemoryHistory();
	const match = createMatch();
	const wrapper = renderWithStore(
		<Note
			reqNoteId={1}
			notes={dummyNotesList}
			pushToast={pushToast}
			setNoteField={setNoteField}
			deleteNotes={deleteNotes}
			match={match}
			history={history}
		/>
	);
	const methods = { pushToast, setNoteField, deleteNotes };

	return { ...wrapper, history, methods };
}
