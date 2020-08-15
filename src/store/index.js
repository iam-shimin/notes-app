import { createStore, compose } from 'redux';
import rootReducers from 'reducers';

// bbd-ycomm-p4

// const store = {
// 	todos: [],
// 	prefs: {}
// }

const initialAppState = {};
let combinedEnhancers;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	combinedEnhancers = compose(
		// applyMiddleware(thunk)
		window.__REDUX_DEVTOOLS_EXTENSION__()
	)
}

const store = createStore(rootReducers, initialAppState, combinedEnhancers);

export default store;