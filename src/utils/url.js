export function queryString(search, get) {
	return new URLSearchParams(search).get(get)
}