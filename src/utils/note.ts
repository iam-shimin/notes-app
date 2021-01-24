export function getTitleFromNote(note: string) {
	if (!note) return;

	const firstFewWords = note.split(' ').slice(0, 4).join(' ');
	const firstWordsSliced = firstFewWords.length > 12
		? firstFewWords.slice(0, 12)
		: firstFewWords;
	return `${firstWordsSliced}...`;
}