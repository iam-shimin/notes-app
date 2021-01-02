import React from 'react';
import { render } from '@testing-library/react';

import { SideNavContextMenu } from '../contextMenu';
import userEvent from '@testing-library/user-event';

describe('ContextMenu', () => {
	const dummySelectedItemSet = { size: 3, length: 3 };
	test('turns active', () => {
		const { container } = render(
			<SideNavContextMenu selectedItems={dummySelectedItemSet} />
		);
		const contextMenu = container.firstElementChild;

		expect(contextMenu).toHaveClass('active');
	});

	test('delete selected items', () => {
		const deleteTodo = jest.fn();
		const onDeleted = jest.fn();
		const { getByRole } = render(
			<SideNavContextMenu
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
