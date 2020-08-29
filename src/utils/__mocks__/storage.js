// NOTES
export const loadTodos = jest.fn()

export const persistTodos = jest.fn(currentStateTodos => {})


// VISIT COUNTERS
export const initVisitCounters = jest.fn()

export const increaseCount = jest.fn(noteId => {})

export const getMostVisited = jest.fn().mockReturnValue(1)


// LAST VISITED
export const setLastVisited = jest.fn(id => {})

export const getLastVisited = jest.fn().mockReturnValue(2);