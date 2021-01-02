import { createStore, compose, applyMiddleware } from 'redux';
import rootReducers from 'reducers';

import persistanceMiddleware from './persistanceMiddleware';
import storageMigrationMiddleware from './storageMigrationMiddleware';


const middlewares = applyMiddleware(storageMigrationMiddleware, persistanceMiddleware);
let combinedEnhancers;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	combinedEnhancers = compose(
		middlewares,
		window.__REDUX_DEVTOOLS_EXTENSION__()
	);
} else {
	combinedEnhancers = middlewares;
}

const store = createStore(rootReducers, combinedEnhancers);

export default store;
