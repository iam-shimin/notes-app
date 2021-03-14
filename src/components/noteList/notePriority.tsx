import React from 'react';
import { joinString } from 'utils/primitive';

interface NotePriorityProps extends React.HTMLProps<HTMLSelectElement> {
	optionLabels?: Partial<{
		high: string,
		med: string,
		low: string
	}>
	value: Priority
}

export default function NotePriority({
	value,
	className,
	optionLabels,
	label,
	...restProps
}:NotePriorityProps) {
	return (
		<select
			className={joinString(['todo-controls', className])}
			value={value}
			aria-label={label || 'Select the Priority of the Note'}
			{...restProps}
		>

			<option value="low">{optionLabels?.low || 'Low'}</option>
			<option value="med">{optionLabels?.med || 'Medium'}</option>
			<option value="high">{optionLabels?.high || 'High'}</option>

		</select>
	);
}
