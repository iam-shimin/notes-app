import React from 'react';
import {render, waitFor} from '@testing-library/react';

import {Notifications} from '../notifications';

export const sample = [
	{_id: 1, message: 'Test'},
	{_id: 2, message: 'Test2'}
];

describe('Notifications', () => {
	test('render notification toasts list', () => {
		// jest.useFakeTimers();
		const {getAllByRole} = render(<Notifications notifications={sample} />);
		const buttons = getAllByRole('button', {name: /Dismiss/});

		expect(buttons.length).toBe(sample.length);
	})

	test('dismiss is called automatically', async () => {
		jest.useFakeTimers();
		const callback = jest.fn();
		const {getAllByRole} = render(<Notifications notifications={sample} dismissToast={callback} />);
		const buttons = getAllByRole('button', {name: /Dismiss/});
		jest.runAllTimers();

		await waitFor(() => {
			expect(callback).toHaveBeenCalledTimes(buttons.length);
		});
	})
})