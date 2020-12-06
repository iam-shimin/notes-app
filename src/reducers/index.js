import { combineReducers } from 'redux';

import notifications from './notificationReducer';
import todos from './todoReducer';

export default combineReducers({
	todos,
	notifications
});
// import actions from './actions';

// export default function rootReducer(state = [], action) {
// 	switch (action.type) {
// 		case actions.TYPES.CREATE:
// 			return [...state, {...actions.payload, id: Date.now()}];
// 		case actions.TYPES.UPDATE:
// 			let target = {...todos.find(todo => todo.id), ...action.data};
// 			return [...state.filter(i => i.id !== action.id), target];
// 		default:
// 			return state;
// 	}
// }
