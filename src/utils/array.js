export default function lastOf(array) {
	if (typeof array.length !== 'number')
		return null;

	return array[array.length - 1];
}