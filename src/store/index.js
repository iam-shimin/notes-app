import { createStore, compose } from 'redux';
import rootReducers from 'reducers';

// bbd-ycomm-p4

// const store = {
// 	todos: [],
// 	prefs: {}
// }
const persistedStoreKey = 'todos';
const persistedTodos = JSON.parse(localStorage.getItem(persistedStoreKey)) || [];
const initialAppState = {todos: persistedTodos};
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
	localStorage.setItem(persistedStoreKey, JSON.stringify(currentStateTodos));
})

export default store;