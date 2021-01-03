import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import './matchMedia.mock';

import AppHeader from '../AppHeader';
import { SidebarProvider } from 'context/sidebar';

describe('AppHeader', () => {
	test('mobile behaviour works', () => {
		// @ts-ignore
		// FIXME
		window.matchMedia.mockImplementationOnce(matchedQuery(true));

		const { getByText } = renderAppHeader();
		const hamburger = getByText('|||');

		expect(hamburger).toBeInTheDocument();
	});

	test('desktop behaviour works', () => {
		// TypeError: MutationObserver is not a constructor
		// @ts-ignore
		window.matchMedia.mockImplementationOnce(matchedQuery(false));

		const { queryByText } = renderAppHeader();
		const hamburger = queryByText('|||');
		expect(hamburger).not.toBeInTheDocument();
	});
});

export function matchedQuery(matches: boolean) {
	return (query: string) => ({
		matches,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn()
	});
}

function renderAppHeader() {
	return render(
		<MemoryRouter>
			<SidebarProvider>
				<AppHeader />
			</SidebarProvider>
		</MemoryRouter>
	);
}
