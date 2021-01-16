export const storeKey = 'notes';
export const fqCountKey = 'visits';

const get = (key: string) => localStorage.getItem(key);
const set = (key: string, value: string) => localStorage.setItem(key, value);

const load = <T>(key: string, fallback: T): T => {
	const persisted = get(key);
	if (!persisted)
		return fallback;
	return JSON.parse(persisted);
}

const dump = (key: string, value: any) => set(key, JSON.stringify(value))

// NOTES
export function loadNotes() {
	return load(storeKey, [] as NoteI[]);
}

export function persistNotes(notes: NoteI[]) {
	dump(storeKey, notes);
}

// VISIT COUNTERS
type FQCount = { [key: string]: number };

function getFq() {
	return load(fqCountKey, {} as FQCount)
}

function setFq(value: FQCount) {
	dump(fqCountKey, value);
}

export function initVisitCounters() {
	let newCount: FQCount = {};
	const vistFq = getFq();
	const persistedNotes = loadNotes();

	persistedNotes.forEach(todo => {
		newCount[todo.id] = vistFq[todo.id] || 1;
	});

	setFq(newCount);
}

export function increaseCount(noteId: number) {
	const vistFq = getFq();
	if (vistFq[noteId]) {
		vistFq[noteId] += 1;
	} else {
		vistFq[noteId] = 1;
	}
	setFq(vistFq);
}

export function getMostVisited() {
	let maxId = null;
	let maxValue = 0;
	const vistFq = getFq();

	if (vistFq !== null) {
		Object.keys(vistFq).forEach(id => {
			if (maxValue < vistFq[id]) {
				maxValue = vistFq[id];
				maxId = id;
			}
		});
	}

	return maxId;
}
