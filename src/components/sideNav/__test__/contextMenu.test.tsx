import React from 'react';
import { render } from '@testing-library/react';

import { SideNavContextMenu } from '../contextMenu';
import userEvent from '@testing-library/user-event';

describe('ContextMenu', () => {
	const dummySelectedItemSet = new Set([1, 2, 3]);
	const requiredProps = {
		onDeleted: jest.fn(),
		onSelectAll: jest.fn(),
		onDeselectAll: jest.fn(),
		deleteNotes: jest.fn()
	};

	test('turns active', () => {
		const { container } = render(
			<SideNavContextMenu {...requiredProps}  selectedItems={dummySelectedItemSet} />
		);
		const contextMenu = container.firstElementChild;

		expect(contextMenu).toHaveClass('active');
	});

	test('delete selected items', () => {
		const deleteTodo = jest.fn();
		const onDeleted = jest.fn();
		const { getByRole } = render(
			<SideNavContextMenu
				{...requiredProps}
				selectedItems={dummySelectedItemSet}
				deleteNotes={deleteTodo}
				onDeleted={onDeleted}
			/>
		);
		const deleteButton = getByRole('button', { name: /Delete/ });
		userEvent.click(deleteButton);

		expect(deleteTodo).toHaveBeenCalledWith(Array.from(dummySelectedItemSet));
		expect(onDeleted).toBeCalledTimes(1);
	});
});
