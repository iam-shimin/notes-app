import React from 'react';
import MostVisited from '../mostVisited';
import { renderWithStore } from 'utils/testRenderers';

jest.mock('utils/storage');

test('mostvisited', () => {
	const { asFragment } = renderWithStore(<MostVisited history location match />);
	expect(asFragment()).toMatchSnapshot();
});
