const persistedStoreKey = 'todos';
const frequncyCountKey = 'visits';
const lastVisitedKey = 'last-viewed';


// NOTES
export function loadTodos() {
	return JSON.parse(localStorage.getItem(persistedStoreKey)) || [];
}

export function persistTodos(currentStateTodos) {
	localStorage.setItem(persistedStoreKey, JSON.stringify(currentStateTodos));
}


// VISIT COUNTERS
export function initVisitCounters() {
	let newCount = {};
	const visitFrequency = JSON.parse(localStorage.getItem(frequncyCountKey)) || {};
	const persistedTodos = loadTodos();

	persistedTodos.forEach(todo => {
		newCount[todo.id] = visitFrequency[todo.id] || 1;
	});

	localStorage.setItem(frequncyCountKey, JSON.stringify(newCount));
}

export function increaseCount(noteId) {
	const visitFrequency = JSON.parse(localStorage.getItem(frequncyCountKey));
	visitFrequency[noteId] += 1;
	localStorage.setItem(frequncyCountKey, JSON.stringify(visitFrequency));
}

export function getMostVisited() {
	let maxId = null;
	let maxValue = 0;
	const visitFrequency = JSON.parse(localStorage.getItem(frequncyCountKey));

	if (visitFrequency !== null) {
		Object.keys(visitFrequency).forEach(id => {
			if (maxValue < visitFrequency[id]) {
				maxValue = visitFrequency[id]
				maxId = id;
			}
		});
	}
	
	return maxId;
}


// LAST VISITED
export function setLastVisited(id) {
	localStorage.setItem(lastVisitedKey, id);
}

export function getLastVisited() {
	return localStorage.getItem(lastVisitedKey)
}