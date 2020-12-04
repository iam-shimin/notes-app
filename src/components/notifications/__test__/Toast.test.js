import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toast from '../Toast';
import { sample } from './notifications.test';

describe('Toast', () => {
	test('click on dismiss will dismiss the toast', () => {
		const callback = jest.fn();
		const {getByRole} = render(
			<Toast
				messageObj={sample[0]}
				dismissTime={1000}
				onDismiss={callback} />
		);
		const dismissButton = getByRole('button', {name: /Dismiss/});
		userEvent.click(dismissButton);

		expect(dismissButton).not.toBeInTheDocument();
	})
})