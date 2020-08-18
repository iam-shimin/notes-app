import React from 'react';
import { render } from '@testing-library/react';
import './matchMedia.mock';
import App from '../App';

test('App crash test', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Recent/i);
  expect(linkElement).toBeInTheDocument();
});