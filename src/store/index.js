import { createStore, compose } from 'redux';
import rootReducers from 'reducers';

import { loadTodos, persistTodos } from 'store/storage';

// bbd-ycomm-p4

// const store = {
// 	todos: [],
// 	prefs: {}
// }
const initialAppState = {todos: loadTodos()};
let combinedEnhancers;

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	combinedEnhancers = compose(
		// applyMiddleware(thunk)
		window.__REDUX_DEVTOOLS_EXTENSION__()
	)
}

const store = createStore(rootReducers, initialAppState, combinedEnhancers);

store.subscribe(() => {
	const currentStateTodos = store.getState().todos;
	persistTodos(currentStateTodos);
});

export default store;