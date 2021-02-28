import React from 'react';
import { joinString } from 'utils/primitive';

interface NotePriorityProps extends React.HTMLProps<HTMLSelectElement> {
	value: Priority
}

export default function NotePriority({
	value,
	className,
	...restProps
}:NotePriorityProps) {
	return (
		<select
			className={joinString(['todo-controls', className])}
			value={value}
			{...restProps}
		>

			<option value="high">High</option>
			<option value="med">Medium</option>
			<option value="low">Low</option>

		</select>
	);
}
