export function asNumber(number: string | number, fallback = 0) {
	const _num = typeof number === 'number' ? number : parseInt(number);
	return typeof _num === 'number'? _num: fallback;
}

export function asString(value: any) {
	return typeof value === 'string' ? value : String(value);
}