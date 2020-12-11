import { createStore } from 'redux';
import rootReducers from 'reducers';
import todos from 'components/todoList/__test__/todos';


const initialAppState = { todos };

export default () => createStore(rootReducers, initialAppState);
