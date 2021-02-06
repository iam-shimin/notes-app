export function asNumber(number?: string | number, fallback = 0) {
	if (number === undefined) return NaN;

	const _num = typeof number === 'number' ? number : parseInt(number);
	return typeof _num === 'number'? _num: fallback;
}

export function asString(value: any) {
	return typeof value === 'string' ? value : String(value);
}

export function joinString(strings: (string | undefined)[], separator = ' ') {
	return strings.filter(i => i).join(separator);
}