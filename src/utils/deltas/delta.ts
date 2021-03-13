import { isTodo, appendTodoDelta, todoToString } from 'utils/deltas/todos';
import { appendHeadingDelta, headingToString } from './heading';
import { appendListDelta, isList, listToString } from './list';

export function getDeltaFromText(text: string) {
	const lines = text.split('\n');
	const initialParsedData: DeltaData[] = [];
	
	const parsedData = lines.reduce((acc, line) => {
		if (isTodo(line)) {
			acc = appendTodoDelta(line, acc);
		} else if (line.startsWith('#')) {
			acc = appendHeadingDelta(line, acc);
		} else if (isList(line)) {
			acc = appendListDelta(line, acc);
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
		} else if (lineData.type === 'list/ul' || lineData.type === 'list/ol') {
			acc += lineSeparator + listToString(lineData);
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