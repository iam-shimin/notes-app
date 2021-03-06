import { getTextFromTodo, isDoneTodo, isTodo } from 'utils/todos';

type TextBlock = { type: 'text'; data: string; };

type TodoItem = { text: string; isDone: boolean };

type TodoBlock = { type: 'todo'; data: TodoItem[]; };

type HeadingBlock = { type: 'heading', data: { headingText: string, level: number }};

type ParsedData = { currentTodoList?: any[]; data: DeltaData[]; };

type DeltaData = TextBlock | TodoBlock | HeadingBlock;

export function getDeltaFromText(text: string) {
	const lines = text.split('\n');
	const initialParsedData: ParsedData = { data: [] };

	const parsedData = lines.reduce((acc, line) => {
		if (isTodo(line)) {
			const todoItem = {
				text: getTextFromTodo(line),
				isDone: isDoneTodo(line)
			};
			if (Array.isArray(acc.currentTodoList)) {
				acc.currentTodoList.push(todoItem);
			} else {
				const newtodoList = [todoItem];
				acc.data.push({
					type: 'todo',
					data: newtodoList
				});
				acc.currentTodoList = newtodoList;
			}
		} else if (line.startsWith('#')) {
			let level = 0;
			let headingText = '';
			let isBroken = false;
			line.split('').forEach(ctr => {
				if (!isBroken) {
					if (ctr === '#') {
						++level;
						return;
					} else {
						isBroken = true;
					}
				}
				headingText += ctr;
			});
			acc.data.push({
				type: 'heading',
				data: { headingText: headingText, level: level>6? 6: level }
			});
		} else {
			acc.currentTodoList = undefined;
			acc.data.push({
				type: 'text',
				data: line
			});
		}
		return acc;
	}, initialParsedData);

	parsedData.currentTodoList = undefined;

	return parsedData.data;
}

export function getTextFromDelta(delta: DeltaData[]) {
	if (getIsEmptyDelta(delta)) {
		return delta[0].data as string;
	}

	const deltaAsString = delta.reduce((acc, lineData, lineIndex) => {
		const lineSeparator = lineIndex > 0? '\n': '';
		if (lineData.type === 'todo') {
			const todolistAsString = lineData.data.reduce(
				(innerAcc, todo, todoIndex) =>
					todo
						? innerAcc + (todoIndex > 0? '\n': '') + `${todo.isDone ? '*' : 'o'} ${todo.text}`
						: innerAcc,
				''
			);
			acc += lineSeparator + todolistAsString;
		} else if (lineData.type === 'heading') {
			acc += lineSeparator + '#'.repeat(lineData.data.level) + lineData.data.headingText;
		} else {
			acc += lineSeparator + lineData.data;
		}

		return acc;
	}, '');

	return deltaAsString
}

export function getIsEmptyDelta(delta: DeltaData[]) {
	return delta.length === 1 && delta[0].type === 'text' && delta[0].data === '';
}