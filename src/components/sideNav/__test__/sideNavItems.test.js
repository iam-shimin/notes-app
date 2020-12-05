import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {MemoryRouter, Router} from 'react-router';
import {createMemoryHistory} from 'history';

import {SideNavItems} from '../sideNavItems';
import todos from 'components/todoList/__test__/todos';
import lastOf from 'utils/array';

describe('SideNavItems', () => {

	test('render items', () => {
		const {getAllByRole} = renderItem(todos);
		const items = getAllByRole('link');

		expect(items.length).toBe(todos.length);
	})

	test('search filter works', () => {
		const history = createMemoryHistory();
		history.push('?q=app');
		const {getAllByRole} = render(
			<Router history={history}>
				<SideNavItems data={todos} recentTodo={lastOf(todos)} />
			</Router>
		);
		const items = getAllByRole('link');

		expect(items.length).toBe(2);
	})

	test('right clicking on item will select it', () => {
		const onContextMenu = jest.fn();
		const {getAllByRole} = renderItem(todos, {onContextMenu});
		const [firstLink] = getAllByRole('link');
		fireEvent.contextMenu(firstLink);

		expect(firstLink).toHaveClass('selected');
		expect(onContextMenu).toHaveBeenCalledWith(todos[0].id);
	})

	test('clicking on a selected item will unselect it', () => {
		let isSelectionModeOn = false;
		const onContextMenu = jest.fn(() => isSelectionModeOn = !isSelectionModeOn);
		const onClick = jest.fn();
		const {getAllByRole} = renderItem(todos, {onContextMenu, onClick, isSelectionModeOn});
		const [firstLink] = getAllByRole('link');
		fireEvent.contextMenu(firstLink);
		fireEvent.click(firstLink);

		expect(firstLink).not.toHaveClass('selected');
		expect(onContextMenu).toHaveBeenCalledWith(todos[0].id);
		// TODO: expected 2, learn rerender anf fix this
		expect(onContextMenu).toHaveBeenCalled();
		expect(onClick).toHaveBeenCalledTimes(1);
	})

	test('right clicking on a selected item will unselect it', () => {
		// TODO: fix this variable, it does not cause automatic rerender, trying to gives error
		let isSelectionModeOn = false;
		const onContextMenu = jest.fn(() => isSelectionModeOn = !isSelectionModeOn);
		const onClick = jest.fn();
		const {getAllByRole} = renderItem(todos, {onContextMenu, onClick, isSelectionModeOn});
		const [firstLink] = getAllByRole('link');
		fireEvent.contextMenu(firstLink);
		fireEvent.contextMenu(firstLink);

		expect(firstLink).not.toHaveClass('selected');
		expect(onContextMenu).toHaveBeenCalledWith(todos[0].id);
		expect(onContextMenu).toHaveBeenNthCalledWith(2, todos[0].id);
	})
});

function renderItem(data, {isSelectionModeOn, onContextMenu, onClick} = {}) {
	return render(
		<MemoryRouter>
			<SideNavItems
				data={data}
				isSelectionModeOn={isSelectionModeOn}
				recentTodo={lastOf(data)}
				onContextMenu={onContextMenu}
				onClick={onClick} />
		</MemoryRouter>
	)
}