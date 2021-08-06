import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import BusinessCard from './BusinessCard';

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

test('Render BusinessCard', () => {
  const { getByTestId } = render(<BusinessCard businessData={[]} index={1} />);
  expect(getByTestId('business-research-form')).toBeInTheDocument();
});
