import React from 'react';
import { renderWithStore } from 'utils/testRenderers';

import RecentTodo from '../recentTodo';

jest.mock('utils/storage');

test('mostvisited', () => {
	const {asFragment} = renderWithStore(<RecentTodo />);
	expect(asFragment()).toMatchSnapshot();
})