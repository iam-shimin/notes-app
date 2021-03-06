import React from 'react';
import {
	getDeltaFromText,
	getTextFromDelta,
	getIsEmptyDelta
} from 'utils/delta';

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

	return (
		<>
			<h1 className="word-wrap">{data.title}</h1>
			<span className="smaller color-grey">
				{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
			</span>
			<hr className="divider" />
			<div>
				{getIsEmptyDelta(parsedData) ? (
					<div style={{ marginTop: '1em' }}>Click 'Edit' to add content.</div>
				) : (
					parsedData.map((lineData, dataIndex) => {
						if (lineData.type === 'todo') {
							return (
								<div key={JSON.stringify(lineData.data)}>
									{lineData.data.map((todo, todoIndex) => (
										<TodoListItem
											key={todo.text}
											{...todo}
											dataIndex={dataIndex}
											todoIndex={todoIndex}
											onChange={updateTodo}
										/>
									))}
								</div>
							);
						} else if (lineData.data === '') {
							return <br />;
						}

						return <p key={lineData.data}>{lineData.data}</p>;
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
		<label style={{ display: 'block' }}>
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
