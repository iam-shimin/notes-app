import lastOf from 'utils/array';

// TODO: refactor to RegEx
export const todoComplete = ['* [ x ]'];
export const todoIncomplete = ['* [ ]'];

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

export function appendTodoDelta(line: string, delta: DeltaData[]) {
	const todoItem = {
		text: getTextFromTodo(line),
		isDone: isDoneTodo(line)
	};
	const lastDelta = lastOf(delta);

	if (lastDelta?.type === 'todo') {
		lastDelta.data.push(todoItem);
		return delta;
	} else {
		const newtodoList: TodoBlock = {
			type: 'todo',
			data: [todoItem]
		};
		return [...delta, newtodoList]
	}
}

export function todoToString(todos: TodoItem[]) {
	const todolistAsString = todos.reduce(
		(innerAcc, todo, todoIndex) =>
			todo
				? innerAcc + (todoIndex > 0? '\n': '') + `${todo.isDone ? todoComplete[0] : todoIncomplete[0]} ${todo.text}`
				: innerAcc,
		''
	);
	return todolistAsString;
}
