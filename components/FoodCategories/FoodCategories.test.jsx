import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodCategories from './FoodCategories';

const allCategories = [
  {
    id: 1,
    value: 'japanese',
    name: 'Japanese Food',
    isSelected: false,
  },
  {
    id: 2,
    value: 'italian',
    name: 'Italian Food',
    isSelected: false,
  },
  {
    id: 3,
    value: 'belgian',
    name: 'Belgian Food',
    isSelected: false,
  },
  {
    id: 4,
    value: 'lebanese',
    name: 'Lebanese Food',
    isSelected: false,
  },
  {
    id: 5,
    value: 'hotdogs',
    name: 'Fast Food',
    isSelected: false,
  },
  {
    id: 6,
    value: 'mexican',
    name: 'Mexican Food',
    isSelected: false,
  },
  {
    id: 7,
    value: 'turkish',
    name: 'Turkish Food',
    isSelected: false,
  },
  {
    id: 8,
    value: 'indpak',
    name: 'Indian Food',
    isSelected: false,
  },
];

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

test('Render FoodCategories', () => {
  const { getByTestId } = render(
    <FoodCategories
      selectedCategories={[]}
      handleSelectedCategories={() =>
        console.log('handleSelectedCategories = null')
      }
      allCategories={allCategories}
    />
  );
  expect(getByTestId('food-categories')).toBeInTheDocument();
});
