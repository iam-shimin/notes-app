import { isTodo, appendTodoDelta, todoToString } from 'utils/deltas/todos';
import { appendHeadingDelta, headingToString } from './heading';

export function getDeltaFromText(text: string) {
	const lines = text.split('\n');
	const initialParsedData: DeltaData[] = [];

	const parsedData = lines.reduce((acc, line) => {
		const isTodoLine = isTodo(line)
		if (isTodoLine) {
			acc = appendTodoDelta(line, acc);
		} else if (line.startsWith('#')) {
			acc = appendHeadingDelta(line, acc);
		} else {
			acc.push({
				type: 'text',
				data: line
			});
		}

		return acc;
	}, initialParsedData);

	return parsedData;
}

export function getTextFromDelta(delta: DeltaData[]) {
	if (getIsEmptyDelta(delta)) {
		return delta[0].data as string;
	}

	const deltaAsString = delta.reduce((acc, lineData, lineIndex) => {
		const lineSeparator = lineIndex > 0? '\n': '';
		if (lineData.type === 'todo') {
			acc += lineSeparator + todoToString(lineData.data);
		} else if (lineData.type === 'heading') {
			acc += lineSeparator + headingToString(lineData.data);
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