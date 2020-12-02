import * as storage from '../storage';
import { expectedResult, sampleTodos, sampleVisitFrequency } from 'utils/__mocks__/dummyData';

jest.unmock('utils/storage');

let expectedForEmpty = {};
Object.keys(expectedResult).forEach(key => expectedForEmpty[key] = 1);

Object.defineProperty(window, 'localStorage', {
	value: {
		getItem: jest.fn(),
		setItem: jest.fn()
	}
});

const visitFqStr = JSON.stringify(sampleVisitFrequency);

describe('utils/storage', () => {
	test('loadTodos', () => {
		const sample = [12, 13, 45];
		window.localStorage.getItem.mockImplementationOnce(() => JSON.stringify(sample));

		expect(storage.loadTodos()).toStrictEqual(sample);
	});

	test.each([
		[visitFqStr, visitFqStr],
		[null, JSON.stringify(expectedForEmpty)]
	])('initVisitCounters', (dummyFqCount, dummyFinal) => {
		const visits = 'visits';
		window.localStorage.getItem.mockImplementation((key) => (
			key === visits? dummyFqCount: 
				key === 'todos'? JSON.stringify(sampleTodos): '')
		);
		window.localStorage.setItem.mockImplementation((_key, _data) => undefined);
		storage.initVisitCounters();

		expect(window.localStorage.setItem).toBeCalledWith(visits, dummyFinal);
	});

	test.skip('increaseCount', () => {});

	test.skip('getMostVisited', () => {});
});