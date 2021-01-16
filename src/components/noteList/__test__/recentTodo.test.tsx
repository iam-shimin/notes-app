import React from 'react';
import { renderWithStore } from 'utils/testRenderers';

import RecentNote from '../recentNote';

jest.mock('utils/storage');

test('mostvisited', () => {
	const { asFragment } = renderWithStore(<RecentNote history location match />);
	expect(asFragment()).toMatchSnapshot();
});
