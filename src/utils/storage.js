export const storeKey = 'notes';
export const fqCountKey = 'visits';

const get = key => localStorage.getItem(key);
const set = (key, value) => localStorage.setItem(key, value);

// NOTES
export function loadNotes() {
	return JSON.parse(get(storeKey)) || [];
}

export function persistNotes(notes) {
	set(storeKey, JSON.stringify(notes));
}

// VISIT COUNTERS
function getFq(fallback = {}) {
	return JSON.parse(get(fqCountKey)) || fallback;
}

function setFq(value) {
	set(fqCountKey, JSON.stringify(value));
}

export function initVisitCounters() {
	let newCount = {};
	const vistFq = getFq();
	const persistedNotes = loadNotes();

	persistedNotes.forEach(todo => {
		newCount[todo.id] = vistFq[todo.id] || 1;
	});

	setFq(newCount);
}

export function increaseCount(noteId) {
	const vistFq = getFq();
	vistFq[noteId] += 1;
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
