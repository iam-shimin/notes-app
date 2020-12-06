import { sampleVisitFrequency, sampleTodos } from './dummyData';

// NOTES
export const loadTodos = jest.fn().mockReturnValue(sampleTodos);

export const persistTodos = jest.fn(currentStateTodos => {});

// VISIT COUNTERS
const getVisitFrequency = jest.fn().mockReturnValue(sampleVisitFrequency);

export const initVisitCounters = jest.fn();

export const increaseCount = jest.fn(noteId => {});

export const getMostVisited = jest.fn().mockReturnValue(1);

// LAST VISITED
export const setLastVisited = jest.fn(id => {});

export const getLastVisited = jest.fn().mockReturnValue(2);
