const todoComplete = ['[*]', '[ * ]', '*', '0', 'x', 'X'];
const todoIncomplete = ['o', 'O', '[]', '[ ]'];

function allTodoTypes() {
	return [...todoComplete, ...todoIncomplete];
}

function startsWithAny(item: string, patterns: string[] = []) {
	return patterns.some(pattern => {
		const trimmed = item.trimStart();
		const firstWord = trimmed.split(' ')[1];
		return firstWord && trimmed.startsWith(`${pattern} `);
	});
}

export function isTodo(item: string) {
	return startsWithAny(item, allTodoTypes());
}

export function isDoneTodo(item: string) {
	return startsWithAny(item, todoComplete);
}

export function getTextFromTodo(todo: string) {
	for (const ptn of allTodoTypes()) {
		if (todo.trimStart().indexOf(ptn) === 0) {
			return todo.replace(ptn, '').trimStart();
		}
	}
	return '';
}