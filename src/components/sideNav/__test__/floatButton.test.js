import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import FloatButton from '../floatButton';

afterEach(cleanup);

test('FloatButton to match snapshot', () => {
	const { asFragment } = render(
		<BrowserRouter>
			<FloatButton label="+" />
		</BrowserRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
