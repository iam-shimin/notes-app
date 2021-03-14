import { toggleEdit } from './appActions';
export const TOGGLE_NOTE_EDIT = 'TOGGLE_NOTE_EDIT';

export type AppAction = ReturnType<typeof toggleEdit>;
