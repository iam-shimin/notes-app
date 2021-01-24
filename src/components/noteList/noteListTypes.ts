export type NoteId = NoteI['id'];

export type NoteFields = keyof NoteI;

export type NoteFieldSetter = (
	noteId: NoteId,
	name: NoteFields,
	// TODO: correct type for 'value'
	value: NoteI[typeof name]
) => void;
