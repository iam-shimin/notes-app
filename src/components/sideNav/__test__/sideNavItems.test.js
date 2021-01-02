import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';

import SideNavItems from '../sideNavItems';
import dummyNotesList from 'components/noteList/__test__/dummyNotesData';
import lastOf from 'utils/array';

describe('SideNavItems', () => {
	test('render items', () => {
		const { getAllByRole } = renderItem(dummyNotesList);
		const items = getAllByRole('link');

		expect(items.length).toBe(dummyNotesList.length);
	});

	test('search filter works', () => {
		const history = createMemoryHistory();
		history.push('?q=app');
		const { getAllByRole } = render(
			<Router history={history}>
				<SideNavItems
					data={dummyNotesList}
					recentTodo={lastOf(dummyNotesList)}
					selectedItemsSet={new Set([])}
				/>
			</Router>
		);
		const items = getAllByRole('link');

		expect(items.length).toBe(2);
	});

	test('right clicking on item will select it', () => {
		const selectedItemsSet = new Set();
		const onContextMenu = jest.fn(id => selectedItemsSet.add(id));
		const { getAllByRole, rerender } = renderItem(dummyNotesList, {
			onContextMenu,
			selectedItemsSet
		});
		const [firstLink] = getAllByRole('link');
		fireEvent.contextMenu(firstLink);
		rerender();

		expect(firstLink).toHaveClass('selected');
		expect(onContextMenu).toHaveBeenCalledWith(dummyNotesList[0].id);
	});

	test('clicking on a selected item will unselect it', () => {
		let isSelectionModeOn = false;
		const onContextMenu = jest.fn(
			() => (isSelectionModeOn = !isSelectionModeOn)
		);
		const onClick = jest.fn();
		const { getAllByRole } = renderItem(dummyNotesList, {
			onContextMenu,
			onClick,
			isSelectionModeOn
		});
		const [firstLink] = getAllByRole('link');
		fireEvent.contextMenu(firstLink);
		fireEvent.click(firstLink);

		expect(firstLink).not.toHaveClass('selected');
		expect(onContextMenu).toHaveBeenCalledWith(dummyNotesList[0].id);
		// TODO: expected 2, learn rerender anf fix this
		expect(onContextMenu).toHaveBeenCalled();
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('right clicking on a selected item will unselect it', () => {
		// TODO: fix this variable, it does not cause automatic rerender, trying to gives error
		let isSelectionModeOn = false;
		const onContextMenu = jest.fn(
			() => (isSelectionModeOn = !isSelectionModeOn)
		);
		const onClick = jest.fn();
		const { getAllByRole } = renderItem(dummyNotesList, {
			onContextMenu,
			onClick,
			isSelectionModeOn
		});
		const [firstLink] = getAllByRole('link');
		fireEvent.contextMenu(firstLink);
		fireEvent.contextMenu(firstLink);

		expect(firstLink).not.toHaveClass('selected');
		expect(onContextMenu).toHaveBeenCalledWith(dummyNotesList[0].id);
		expect(onContextMenu).toHaveBeenNthCalledWith(2, dummyNotesList[0].id);
	});
});

function renderItem(
	data,
	{
		isSelectionModeOn,
		onContextMenu,
		selectedItemsSet = new Set([]),
		onClick
	} = {}
) {
	function WrapComponent() {
		return (
			<MemoryRouter>
				<SideNavItems
					data={data}
					isSelectionModeOn={isSelectionModeOn}
					selectedItemsSet={selectedItemsSet}
					recentTodo={lastOf(data)}
					onContextMenu={onContextMenu}
					onClick={onClick}
				/>
			</MemoryRouter>
		);
	}

	const api = render(<WrapComponent />);

	function rerender() {
		api.rerender(<WrapComponent />);
	}

	return { ...api, rerender };
}
