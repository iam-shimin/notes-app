/**
 * Return the last item of the Arraylike
 * @param array - the array
 * @returns lastItems
 **/
export default function lastOf<T = any>(array: T[]) {
	if (array.length === 0) return null;

	return array[array.length - 1];
}
