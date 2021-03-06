import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import createDummyStore from 'store/dummyStore';
import ConnectedNoteContent, { NoteContent } from '../noteContent';
import notes from './dummyNotesData';


const assertedValue = 'Apple';

const titleInput = /Title/;
const noteInput = /Note/;
const [note] = notes;


describe('NoteContent', () => {
	test('callback is called on every change', () => {
		const callbackMock = jest.fn();
		const { getByLabelText } = render(
			<NoteContent noteId={note.id} disableEdit={false} data={note} setNoteField={callbackMock} />
		);

		const title = getByLabelText(titleInput);
		for (let i = 0; i <= assertedValue.length; i++)
			fireEvent.change(title, { target: { value: assertedValue.slice(0, i) } });

		expect(callbackMock).toHaveBeenCalledTimes(assertedValue.length + 1);
	});

	test('allows to input title text', () => {
		const store = createDummyStore();
		const { getByLabelText } = render(
			<Provider store={store}>
				<ConnectedNoteContent disableEdit={false} noteId={note.id} data={note} />
			</Provider>
		);
		const title = getByLabelText(titleInput);
		fireEvent.change(title, { target: { value: assertedValue } });
		const [ updatedNote ] = store.getState().notes;

		expect(updatedNote.title).toBe(assertedValue);
	});

	test('allows to input note text', () => {
		const store = createDummyStore();
		const { getByLabelText } = render(
			<Provider store={store}>
				<ConnectedNoteContent disableEdit={false} noteId={note.id} data={note} />
			</Provider>
		);
		const notes = getByLabelText(noteInput);
		fireEvent.change(notes, { target: { value: assertedValue } });
		const [ updatedNote ] = store.getState().notes;
		
		expect(updatedNote.notes).toBe(assertedValue);
	});

	test('disable title text: text not changing', () => {
		const store = createDummyStore();
		const { queryByLabelText } = render(
			<Provider store={store}>
				<ConnectedNoteContent
					noteId={1}
					data={{ title: 'Ok', notes: 'blah', id: 1 }}
					disableEdit={true}
				/>
			</Provider>
		);
		const title = queryByLabelText(titleInput);
		expect(title).not.toBeInTheDocument();
	});

	test('disable note text: note edit box disappears', () => {
		const store = createDummyStore();
		const { queryByLabelText } = render(
			<Provider store={store}>
				<ConnectedNoteContent
					noteId={1}
					data={{ title: 'Ok', notes: 'blah', id: 1 }}
					disableEdit={true} />
			</Provider>
		);
		const notes = queryByLabelText(noteInput);
		expect(notes).not.toBeInTheDocument();
	});
});

function changeElementValue(element: HTMLElement, shouldFail = false) {
	if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement))
		throw new Error('Unexpected input element');

	fireEvent.change(element, { target: { value: assertedValue } });
	expect(element.disabled).toBe(shouldFail);
	if (shouldFail) {
		expect(element.value).not.toBe(assertedValue);
	} else {
		expect(element.value).toBe(assertedValue);
	}
}
