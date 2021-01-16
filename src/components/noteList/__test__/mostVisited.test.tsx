import React from 'react';
import MostVisited from '../mostVisited';
import { renderWithStore, createRouterComponentProps } from 'utils/testRenderers';

jest.mock('utils/storage');

test('mostvisited', () => {
	const { asFragment } = renderWithStore(<MostVisited {...createRouterComponentProps()} />);
	expect(asFragment()).toMatchSnapshot();
});
