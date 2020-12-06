import { createStore, compose, applyMiddleware } from 'redux';
import rootReducers from 'reducers';

import { loadTodos } from 'utils/storage';
import persistanceMiddleware from './persistanceMiddleware';

// bbd-ycomm-p4

const initialAppState = { todos: loadTodos() };
let combinedEnhancers;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	combinedEnhancers = compose(
		applyMiddleware(persistanceMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__()
	);
}

const store = createStore(rootReducers, initialAppState, combinedEnhancers);

export default store;
