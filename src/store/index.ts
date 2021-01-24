import { createStore, compose, applyMiddleware } from 'redux';
import rootReducers from 'reducers';

import persistanceMiddleware from './persistanceMiddleware';
import storageMigrationMiddleware from './storageMigrationMiddleware';
// TODO: fix ts-ignores
// TODO: add typing for store.state
//@ts-ignore
const middlewares = applyMiddleware(storageMigrationMiddleware, persistanceMiddleware);
let combinedEnhancers;
//@ts-ignore
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	combinedEnhancers = compose(
		middlewares,//@ts-ignore
		window.__REDUX_DEVTOOLS_EXTENSION__()
	);
} else {
	combinedEnhancers = middlewares;
}

const store = createStore(rootReducers, combinedEnhancers);

export default store;
