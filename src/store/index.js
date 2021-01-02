import { createStore, compose, applyMiddleware } from 'redux';
import rootReducers from 'reducers';

import { loadNotes } from 'utils/storage';
import persistanceMiddleware from './persistanceMiddleware';


const initialAppState = { notes: loadNotes() };
let combinedEnhancers;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	combinedEnhancers = compose(
		applyMiddleware(persistanceMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__()
	);
} else {
	combinedEnhancers = applyMiddleware(persistanceMiddleware);
}

const store = createStore(rootReducers, initialAppState, combinedEnhancers);

export default store;
