import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('Render Header', () => {
  const { getByTestId } = render(<Header />);
  expect(getByTestId('header')).toBeInTheDocument();
});
