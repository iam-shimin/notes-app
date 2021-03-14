import lastOf from 'utils/array';

const listItem = /^(\*.?|\d+?\.)\s(.*?)$/;
const unorderedListItem = /^\*.?\s.*?$/;

export function isList(item: string) {
	return listItem.test(item);
}

export function getTextFromListItem(line: string) {
	const match = listItem.exec(line)
	if (match) {
		return match[2];
	}
	return '';
}

export function appendListDelta(line: string, delta: DeltaData[]) {
	const lastDelta = lastOf(delta);

	const listItem = getTextFromListItem(line);

	let type: ListBlock['type'] = 'list/ol';

	if (unorderedListItem.test(line)) {
		type = 'list/ul';
	}

	if (lastDelta?.type === type) {
		lastDelta.data.push(listItem);
		return delta;
	} else {
		const newtodoList: ListBlock = {
			type: type,
			data: [listItem]
		};
		return [...delta, newtodoList]
	}
}

export function listToString(list: ListBlock) {
	const marker = list.type === 'list/ul'? '* ': '';
	const listAsString = list.data.reduce(
		(innerAcc, listItem, itemIndex) =>
			listItem
				? innerAcc + (itemIndex > 0? '\n': '') + `${marker || `${itemIndex}.`} ${listItem}`
				: innerAcc,
		''
	);
	return listAsString;
}
