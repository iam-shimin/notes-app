import React from 'react';
import { getTextFromTodo, isDoneTodo, isTodo } from 'utils/todos';

type TextBlock = {
	type: 'text',
	data: string
}

type TodoItem = {text: string, isDone: boolean};

type TodoBlock = {
	type: 'todo',
	data: TodoItem[]
}

type ParsedData = {
	currentTodoList?: any[],
	data: (TodoBlock | TextBlock)[]
};

export default function NotePreview({
	content
}: { content: string }) {
	const lines = content.split('\n');
	const initialParsedData: ParsedData = { data: [] };
	
	const parsedData = lines.reduce((acc, line) => {
		if (isTodo(line)) {
			const todoItem = {text: getTextFromTodo(line), isDone: isDoneTodo(line)};
			if (Array.isArray(acc.currentTodoList)){
				acc.currentTodoList.push(todoItem);
			} else {
				const newtodoList = [todoItem];
				acc.data.push({
					type: 'todo',
					data: newtodoList
				});
				acc.currentTodoList = newtodoList;
			}
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

	return (
		<div>
			{parsedData.data.map(lineData => {
				if (lineData.type === 'todo') {
					return (
						<div>
							{lineData.data.map(todo => <TodoListItem key={todo.text} {...todo} />)}
						</div>
					);
				}
				return <p>{lineData.data}</p>
			})}
		</div>
	)
}

function TodoListItem({text, isDone}: {text: string, isDone: boolean}) {
	return (
		<label style={{display: 'block'}}>
			<input type="checkbox" checked={isDone} />
			{text}
		</label>
	);
}
