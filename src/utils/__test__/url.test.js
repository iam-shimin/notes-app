import { queryString } from '../url';

test('query string works', () => {
	const search = '?app=correct&q=search';
	expect(queryString(search, 'app')).toBe('correct');
});
