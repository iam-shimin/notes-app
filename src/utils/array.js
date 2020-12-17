/**
 * Return the last item of the Arraylike
 * @param array - the array
 * @returns lastItems
 **/
export default function lastOf(array) {
	if (typeof array.length !== 'number') return null;

	return array[array.length - 1];
}
