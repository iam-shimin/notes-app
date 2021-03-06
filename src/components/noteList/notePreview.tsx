import React from 'react';
import {
	getDeltaFromText,
	getTextFromDelta,
	getIsEmptyDelta
} from 'utils/delta';
import { joinString } from 'utils/primitive';

type TodoEvent = { dataIndex: any; todo: string };

export default function NotePreview({
	data,
	onTodoStatusChange
}: {
	data: NoteI;
	onTodoStatusChange: (note: string) => void;
}) {
	const parsedData = getDeltaFromText(data.notes);
	const createdAt = new Date(data.id);

	function updateTodo(event: React.ChangeEvent<HTMLInputElement>) {
		const { dataset, checked } = event.currentTarget;
		const updatedData = parsedData.map((lineData, lineIndex) => {
			if (
				lineData.type === 'todo' &&
				lineIndex.toString() === dataset.dataIndex
			) {
				const upatedTodos = lineData.data.map((todoData, todoIndex) => {
					if (todoIndex.toString() === dataset.todoIndex) {
						return { text: todoData.text, isDone: checked };
					}
					return todoData;
				});
				return { type: lineData.type, data: upatedTodos };
			}
			return lineData;
		});

		onTodoStatusChange(getTextFromDelta(updatedData));
	}

	function handleNewTodo(event: TodoEvent) {
		const updatedData = [...parsedData];
		const selectedDeltaItem = updatedData[event.dataIndex];
		if (selectedDeltaItem.type === 'todo') {
			selectedDeltaItem.data.push({
				text: event.todo,
				isDone: false
			});
			onTodoStatusChange(getTextFromDelta(updatedData));
		}
	}

	return (
		<>
			<h1 className="word-wrap">{data.title}</h1>
			<span className="smaller color-grey">
				{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
			</span>
			<hr className="divider" />
			<div>
				{/* FIXME: the 'keys' with index causes too much remounts
						This was added so that same line repeating will not cause corrupted UI
				 */}
				{getIsEmptyDelta(parsedData) ? (
					<div style={{ marginTop: '1em' }}>Click 'Edit' to add content.</div>
				) : (
					parsedData.map((lineData, dataIndex) => {
						if (lineData.type === 'todo') {
							return (
								<div key={`${dataIndex}${JSON.stringify(lineData.data)}`}>
									{lineData.data.map((todo, todoIndex) => (
										<TodoListItem
											key={`${todoIndex}${todo.text}`}
											{...todo}
											dataIndex={dataIndex}
											todoIndex={todoIndex}
											onChange={updateTodo}
										/>
									))}
									<AddTodoForm id={dataIndex} onSubmit={handleNewTodo} />
								</div>
							);
						} else if (lineData.data === '') {
							return <br key={dataIndex} />;
						}

						return <p key={`${dataIndex}${lineData.data}`}>{lineData.data}</p>;
					})
				)}
			</div>
		</>
	);
}

interface TodoItemProps {
	text: string;
	isDone: boolean;
	dataIndex: number;
	todoIndex: number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TodoListItem({
	text,
	isDone,
	dataIndex,
	todoIndex,
	onChange
}: TodoItemProps) {
	return (
		<label className={joinString(['block', isDone && 'todo-item--checked'])}>
			<input
				type="checkbox"
				data-data-index={dataIndex}
				data-todo-index={todoIndex}
				checked={isDone}
				onChange={onChange}
			/>
			{text}
		</label>
	);
}

interface AddTodoFormProps {
	id: any;
	onSubmit: (event: TodoEvent) => void;
}

function AddTodoForm({ id, onSubmit }: AddTodoFormProps) {
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const { currentTarget } = event;
		const textNode = currentTarget.elements.item(0) as HTMLInputElement | null;
		const todo = textNode?.value;
		if (!todo || !textNode) return;
		textNode.value = '';
		textNode.focus();
		onSubmit({ dataIndex: currentTarget.id, todo });
	}
	return (
		<form id={id} onSubmit={handleSubmit}>
			<input aria-label="Add todo" placeholder="Add todo" type="text" />
			<button>+</button>
		</form>
	);
}
