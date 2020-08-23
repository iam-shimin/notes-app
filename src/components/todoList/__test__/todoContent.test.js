import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Provider} from 'react-redux';

import store from 'store';
import TodoContent, {textareaPlaceholder} from '../todoContent';

// describe
// test / it
// jest

describe('TodoContent', () => {

	test('allows to input title text', () => {
		const {getByPlaceholderText} = render(
			<Provider store={store}>
				<TodoContent />
			</Provider>
		);
		const title = getByPlaceholderText('What do you need to do ?');
		changeElementValue(title);
	});

	test('allows to input note text', () => {
		const {getByPlaceholderText} = render(
			<Provider store={store}>
				<TodoContent />
			</Provider>
		);
		const notes = getByPlaceholderText('textareaPlaceholder');
		changeElementValue(notes);
	});

	test('disable title text: text not changing', () => {
		const {getByPlaceholderText} = render(
			<Provider store={store}>
				<TodoContent
					noteId={1}
					data={{title: 'Ok', notes: 'blah', id: 1}}
					disableEdit={true}
					setTodoField={()=>{}} />
			</Provider>
		);
		const title = getByPlaceholderText('What do you need to do ?');
		changeElementValue(title, true);
	});

	test('disable note text: note not changing', () => {
		const {getByPlaceholderText} = render(
			<Provider store={store}>
				<TodoContent
					noteId={1}
					data={{title: 'Ok', notes: 'blah', id: 1}}
					disableEdit={true}
					setTodoField={()=>{}} />
			</Provider>
		);
		const notes = getByPlaceholderText('textareaPlaceholder');
		changeElementValue(notes, true);
	});
})

function changeElementValue(element, shouldFail = false) {
	const assertedValue = 'Apple';
	fireEvent.change(element, {target: {value: assertedValue}});
	expect(element.disabled).toBe(shouldFail);
	if (shouldFail) {
		expect(element.value).not.toBe(assertedValue);
	} else {
		expect(element.value).toBe(assertedValue);
	}
}