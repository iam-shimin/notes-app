import * as storage from '../storage';
import {
	sampleTodos,
	sampleVisitFrequency,
	visitFQWithFirstIncrd,
	maxViewId
} from 'utils/__mocks__/dummyData';

jest.unmock('utils/storage');

const expectedForEmpty = Object
	.keys(sampleVisitFrequency)
	.reduce((acc, key) => {
		acc[key] = 1;
		return acc;
	}, {});

Object.defineProperty(window, 'localStorage', {
	value: {
		getItem: jest.fn(),
		setItem: jest.fn()
	}
});

const visits = 'visits';
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
		window.localStorage.getItem.mockImplementation((key) => (
			key === visits? dummyFqCount: 
				key === 'todos'? JSON.stringify(sampleTodos): '')
		);
		window.localStorage.setItem.mockImplementation((_key, _data) => undefined);
		storage.initVisitCounters();

		expect(window.localStorage.setItem).toBeCalledWith(visits, dummyFinal);
	});

	test('increaseCount', () => {
		const firstDummyTodo = sampleTodos[0].id;
		window.localStorage.getItem.mockReturnValue(visitFqStr);
		window.localStorage.setItem.mockImplementation((_key, _data) => undefined);
		storage.increaseCount(firstDummyTodo);

		expect(window.localStorage.setItem).toBeCalledWith(visits, JSON.stringify(visitFQWithFirstIncrd));
	});

	test('getMostVisited', () => {
		window.localStorage.getItem.mockReturnValue(visitFqStr);
		const maxid = storage.getMostVisited();

		expect(maxid).toBe(String(maxViewId));
	});
});