type TextBlock = { type: 'text'; data: string };

type TodoItem = { text: string; isDone: boolean };

type TodoBlock = { type: 'todo'; data: TodoItem[] };

type HeadingBlock = {
	type: 'heading';
	data: { headingText: string; level: number };
};

type OrderedListBlock = { type: 'list/ol'; data: string[] };

type UnorderedListBlock = { type: 'list/ul'; data: string[] };

type ListBlock = OrderedListBlock | UnorderedListBlock;

type DeltaData = TextBlock | TodoBlock | HeadingBlock | ListBlock;
