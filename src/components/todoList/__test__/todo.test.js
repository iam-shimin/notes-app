import React from 'react';
// import { render } from '@testing-library/react';
import { Todo } from '../Todo';
import { createMemoryHistory } from 'history';
import todos from './todos';
import { renderWithStore } from 'utils/testRenderers';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

jest.mock('utils/storage');

describe('<Todo />', () => {
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

		expect(methods.setTodoField).toBeCalledWith(
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

		expect(methods.deleteTodo).toBeCalledWith(expect.arrayContaining([1]));
	});
});

function renderComponent() {
	const pushToast = jest.fn();
	const setTodoField = jest.fn();
	const deleteTodo = jest.fn();
	const history = createMemoryHistory();
	const wrapper = renderWithStore(
		<Todo
			todoid={1}
			todos={todos}
			pushToast={pushToast}
			setTodoField={setTodoField}
			deleteTodo={deleteTodo}
			match={{}}
			history={history}
		/>
	);
	const methods = { pushToast, setTodoField, deleteTodo };

	return { ...wrapper, history, methods };
}
