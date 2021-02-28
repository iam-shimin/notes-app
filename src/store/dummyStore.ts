import { createStore } from 'redux';
import rootReducers from 'reducers';
import notes from 'components/noteList/__test__/dummyNotesData';


const initialAppState = { notes };

export default () => createStore(rootReducers, initialAppState);
