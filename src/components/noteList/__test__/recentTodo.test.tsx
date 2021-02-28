import React from 'react';
import { renderWithStore, createRouterComponentProps } from 'utils/testRenderers';

import RecentNote from '../recentNote';

jest.mock('utils/storage');

test('mostvisited', () => {
	const { asFragment } = renderWithStore(<RecentNote {...createRouterComponentProps()} />);
	expect(asFragment()).toMatchSnapshot();
});
