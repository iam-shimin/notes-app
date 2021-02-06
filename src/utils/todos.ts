const todoComplete = ['[*]', '[ * ]', '*', '0', 'x', 'X'];
const todoIncomplete = ['o', 'O', '[]', '[ ]'];

function startsWithAny(item: string, patterns: string[] = []) {
	return patterns.some(pattern => {
		const trimmed = item.trimStart();
		const firstWord = trimmed.split(' ')[1];
		return firstWord && trimmed.startsWith(`${pattern} `);
	});
}

export function total(item: string) {
	return startsWithAny(item, [...todoComplete, ...todoIncomplete]);
}

export function done(item: string) {
	return startsWithAny(item, todoComplete);
}