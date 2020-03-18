
// GET /users/:id [Authed]
const userProfileData = {
	username: String,
	displayname: String,
	avatar: Image,
	id: Number,
	password: Hash,
	preferences: {},
	notifications: '/users/:id/notifications',
	todos: '/users/:id/notifications',
	todo_stat: '/users/:id/todostat'
}

// GET /users/:id/notifications
const userNotificationData = {
	notifications: []
}

// GET /users/:id/todostat
const userTodoData = {
	lastAdded: 'id',
	mostChecked: 'id',
	lastChecked: 'id',
	count: {
		current: Number,
		done: Number,
		deleted: Number
	}
}

// GET /users/:id/todos
const todosData = {
	todos: [{
		id: Number,
		title: String,
		notes_trimmed: String,
		checkpoints_checked: [Number('Done'), Number('Total')],
		status: '%',
		priority: ['low', 'med', 'high'],
		dateAdded: Date,
		dateModified: Date,
		lastChecked: Date,
		dueDate: Date,
		checkFrequency: Number
	}]
}

// GET /users/:id/todos/:id
const todoItemData = {
	todos: [{
		id: Number,
		title: String,
		notes: String,
		checkpoints: [String, 'priority'],
		checkpoints_checked: [Number('Done'), Number('Total')],
		status: '%',
		priority: ['low', 'med', 'high'],
		dateAdded: Date,
		dateModified: Date,
		lastChecked: Date,
		dueDate: Date,
		checkFrequency: Number
	}]
}