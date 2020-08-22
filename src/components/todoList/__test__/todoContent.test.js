import React from 'react';
import TodoContent from '../todoContent';
import { render, fireEvent } from '@testing-library/react';

import store from 'store';
import {Provider} from 'react-redux';


test('allows to input text', () => {
	const {getByPlaceholderText} = render(
		<Provider store={store}>
			<TodoContent />
		</Provider>
	);
	const assertedValue = 'Apple';
	const title = getByPlaceholderText('What do you need to do ?');
	fireEvent.change(title, {target: {value: assertedValue}});
	expect(title.disabled).toBe(false);
	expect(title.value).toBe(assertedValue);
})