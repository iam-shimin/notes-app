type Id = number;

type Priority = 'low' | 'med' | 'high';

interface NoteI {
	id: Id,
	title: string,
	priority?: Priority,
	notes: string
}

interface NotificationI {
	_id: Id,
	message: string
}