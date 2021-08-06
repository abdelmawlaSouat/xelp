import React from 'react';
// import ReactDom from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CityAutoCompleteField from './CityAutoCompleteField';

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

test('Render CityAutoCompleteField', () => {
  const { getByTestId } = render(<CityAutoCompleteField />);
  expect(getByTestId('city-field-container')).toBeInTheDocument();
});

// test('Render CityAutoCompleteField', () => {
//   const handleLocalisation = jest.fn();

//   const { document, getByTestId } = render(
//     <CityAutoCompleteField handleLocalisation={handleLocalisation} />
//   );
//   // const component = getByTestId('city-field-container');
//   fireEvent.change(getByTestId('city-field'));

//   expect(handleLocalisation).toHaveBeenCalledTimes(1);
// });
