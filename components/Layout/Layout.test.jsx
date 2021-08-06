import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from './Layout';

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

test('Render Layout', () => {
  const { getByTestId } = render(<Layout />);
  expect(getByTestId('layout')).toBeInTheDocument();
});
