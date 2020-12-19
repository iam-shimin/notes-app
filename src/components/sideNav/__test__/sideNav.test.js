import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import SideNav from '../SideNav';
import { SidebarProvider } from 'context/sidebar';
import rootReducer from 'reducers';
import { matchedQuery } from 'components/App/__test__/AppHeader.test';
import notes from 'components/noteList/__test__/dummyNotesData';

describe('SideNav', () => {
	test('initialy shows empty message', () => {
		const store = createStore(rootReducer, { notes: [] });
		const history = createMemoryHistory();
		const { getByText } = renderSideNav(history, store);
		const message = getByText(/You have nothing on your notes/);

		expect(message).toBeInTheDocument();
	});

	test('shows empty search result message', () => {
		window.matchMedia.mockImplementationOnce(matchedQuery(false));
		const store = createStore(rootReducer, { notes });
		const history = createMemoryHistory();
		history.push('?q=apple');
		const { getByText } = renderSideNav(history, store);
		const message = getByText(/Nothing matched your search/);

		expect(message).toBeInTheDocument();
	});
});

function renderSideNav(history, store) {
	return render(
		<Router history={history}>
			<SidebarProvider>
				<Provider store={store}>
					<SideNav />
				</Provider>
			</SidebarProvider>
		</Router>
	);
}
