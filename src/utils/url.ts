export function queryString(search: string, get: string) {
	return new URLSearchParams(search).get(get);
}
