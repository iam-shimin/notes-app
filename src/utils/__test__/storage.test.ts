import * as storage from '../storage';
import {
	sampleTodos,
	sampleVisitFrequency,
	visitFQWithFirstIncrd,
	maxViewId
} from 'utils/__mocks__/dummyData';

jest.unmock('utils/storage');


const expectedForEmpty = Object.keys(sampleVisitFrequency).reduce(
	(acc, key) => {
		acc[key] = 1;
		return acc;
	},
	{} as Record<string, number>
);

Object.defineProperty(window, 'localStorage', {
	value: {
		getItem: jest.fn(),
		setItem: jest.fn()
	}
});

// const visits = 'visits';
const visitFqStr = JSON.stringify(sampleVisitFrequency);

describe('utils/storage', () => {
	test('loadNotes', () => {
		const sample = [12, 13, 45];
		//@ts-ignore
		window.localStorage.getItem.mockImplementationOnce(() =>
			JSON.stringify(sample)
		);

		expect(storage.loadNotes()).toStrictEqual(sample);
	});

	test.each([
		[visitFqStr, visitFqStr],
		[null, JSON.stringify(expectedForEmpty)]
	])('initVisitCounters', (dummyFqCount, dummyFinal) => {
		//@ts-ignore
		window.localStorage.getItem.mockImplementation(key =>
			key === storage.fqCountKey
				? dummyFqCount
				: key === storage.storeKey
				? JSON.stringify(sampleTodos)
				: ''
		);
		//@ts-ignore
		window.localStorage.setItem.mockImplementation((_key, _data) => undefined);
		storage.initVisitCounters();

		expect(window.localStorage.setItem).toBeCalledWith(storage.fqCountKey, dummyFinal);
	});

	test('increaseCount', () => {
		const firstDummyTodo = sampleTodos[0].id;
		//@ts-ignore
		window.localStorage.getItem.mockReturnValue(visitFqStr);
		//@ts-ignore
		window.localStorage.setItem.mockImplementation((_key, _data) => undefined);
		storage.increaseCount(firstDummyTodo);

		expect(window.localStorage.setItem).toBeCalledWith(
			storage.fqCountKey,
			JSON.stringify(visitFQWithFirstIncrd)
		);
	});

	test('getMostVisited', () => {
		//@ts-ignore
		window.localStorage.getItem.mockReturnValue(visitFqStr);
		const maxid = storage.getMostVisited();

		expect(maxid).toBe(String(maxViewId));
	});
});
