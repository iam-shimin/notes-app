type TextBlock = { type: 'text'; data: string; };

type TodoItem = { text: string; isDone: boolean };

type TodoBlock = { type: 'todo'; data: TodoItem[]; };

type HeadingBlock = { type: 'heading', data: { headingText: string, level: number }};

type DeltaData = TextBlock | TodoBlock | HeadingBlock;