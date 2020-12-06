const storeKey = 'todos';
const fqCountKey = 'visits';

const get = key => localStorage.getItem(key);
const set = (key, value) => localStorage.setItem(key, value);

// NOTES
export function loadTodos() {
	return JSON.parse(get(storeKey)) || [];
}

export function persistTodos(todos) {
	set(storeKey, JSON.stringify(todos));
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
	const persistedTodos = loadTodos();

	persistedTodos.forEach(todo => {
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
