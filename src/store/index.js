import {createStore} from 'redux';
import rootReducers from './reducers';

// const store = {
// 	todos: [],
// 	prefs: {}
// }

const store = createStore(rootReducers);

export default store;