import React from 'react';
import {render, waitFor} from '@testing-library/react';

import {Notifications} from '../notifications';

export const sample = [
	{_id: 1, message: 'Test'},
	{_id: 2, message: 'Test2'}
];

describe('Notifications', () => {
	test('render notification toasts list', () => {
		const {getAllByRole} = render(<Notifications notifications={sample} />);
		const buttons = getAllByRole('button', {name: /Dismiss/});

		expect(buttons.length).toBe(sample.length);
	})

	test('dismiss is called automatically', async () => {
		jest.useFakeTimers();
		const callback = jest.fn();
		const { queryAllByRole } = render(<Notifications notifications={sample} dismissToast={callback} />);
		
		await waitFor(() => {
			jest.runAllTimers();
			expect(queryAllByRole('button', {name: /Dismiss/}).length).toBe(0);
		});
		expect(callback).toHaveBeenCalledTimes(sample.length);
	})
})