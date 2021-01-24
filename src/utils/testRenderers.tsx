import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from 'reducers';
import notes from 'components/noteList/__test__/dummyNotesData';
import { Router } from 'react-router';
import { createMemoryHistory, Location } from 'history';
import { match, RouteComponentProps } from 'react-router-dom';

const dummyStore = createStore(rootReducer, { notes });
const dummyHistory = createMemoryHistory();

export function renderWithStore(component: React.ReactElement) {
	return render(<Provider store={dummyStore}>{component}</Provider>);
}

export function renderWithRouter(component: React.ReactElement) {
	const wrap = render(<Router history={dummyHistory}>{component}</Router>);
	const rerender = (component: React.ReactElement) =>
		wrap.rerender(<Router history={dummyHistory}>{component}</Router>);
	return { ...wrap, history: dummyHistory, rerender };
}

export default function renderWithStoreAndRouter(component: React.ReactElement) {
	const wrap = render(<Router history={dummyHistory}>{component}</Router>);
	return { ...wrap, history: dummyHistory };
}
// FIXME:  doesn't return match<T>
export function createMatch<T extends {}>(options: Partial<match<T>> = {}) {
	const match: match = {
		url: '',
		path: '',
		isExact: true,
		params: {},
		...options
	};
	return match;
}

export function createLocation<State extends {}>(options: Partial<Location<State>> = {}) {
	const location: Location = { hash: '', key: '', pathname: '', search: '', state: null, ...options };
	return location;
}

export function createRouterComponentProps(): RouteComponentProps {
	return {
		match: createMatch(),
		location: createLocation(),
		history: dummyHistory
	}
}