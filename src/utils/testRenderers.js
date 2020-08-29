import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from 'reducers';
import todos from 'components/todoList/__test__/todos';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const dummyStore = createStore(rootReducer, {todos});
const dummyHistory = createMemoryHistory();

export function renderWithStore(component) {
	return render(
		<Provider store={dummyStore}>{component}</Provider>
	);
}

export default function renderWithStoreAndRouter(component) {
	return renderWithStore(<Router history={dummyHistory}>{component}</Router>)
}