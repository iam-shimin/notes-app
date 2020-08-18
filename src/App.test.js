import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App crash test', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/ /i);
  expect(linkElement).toBeInTheDocument();
});