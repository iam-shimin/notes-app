type Id = number;

interface NoteI {
	id: Id,
	title: string,
	priority: string,
	notes: string
}

interface NotificationI {
	_id: Id,
	message: string
}