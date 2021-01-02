import React from 'react';
import { renderWithStore } from 'utils/testRenderers';

import RecentNote from '../recentNote';

jest.mock('utils/storage');

test('mostvisited', () => {
	const { asFragment } = renderWithStore(<RecentNote />);
	expect(asFragment()).toMatchSnapshot();
});
