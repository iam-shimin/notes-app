const id_a = 1597731883759;
const id_b = 1599332969029;

export const sampleVisitFrequency = { [id_a]: 75, [id_b]: 7 };

export const sampleTodos = [
	{
		id: id_a,
		notes: '',
		priority: 'med',
		title: 'code FE'
	},
	{
		id: id_b,
		notes: '',
		title: 'applemnbn'
	}
];

export const visitFQWithFirstIncrd = { ...sampleVisitFrequency, [id_a]: 76 };

export const maxViewId = id_a;
