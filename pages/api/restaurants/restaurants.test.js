import { getFilters, getUrl } from '.';

// Tests For GetFilters(-)

test('With Location, 1 category, 1 price', () => {
  expect(
    getFilters({
      localisation: 'Barcelona',
      maxDistance: 10,
      rangePrice: [{ value: 3, label: '€€€', isSelected: true }],
      selectedCategories: [
        {
          id: 6,
          value: 'mexican',
          name: 'Mexican Food',
          icon: [Object],
          isSelected: true,
        },
      ],
      userCoords: { latitude: 50.862742399999995, longitude: 4.3571042 },
    })
  ).toEqual({
    localisation: 'Barcelona',
    radius: 10000,
    price: '3',
    categories: 'mexican',
  });
});

test('With User position, 2 category, 1 price', () => {
  expect(
    getFilters({
      localisation: '',
      maxDistance: 10,
      rangePrice: [{ value: 2, label: '€€', isSelected: true }],
      selectedCategories: [
        {
          id: 6,
          value: 'mexican',
          name: 'Mexican Food',
          icon: [Object],
          isSelected: true,
        },
        {
          id: 7,
          value: 'turkish',
          name: 'Turkish Food',
          icon: [Object],
          isSelected: true,
        },
      ],
      userCoords: { latitude: 50.8627835, longitude: 4.3570104 },
    })
  ).toEqual({
    localisation: '',
    radius: 10000,
    price: '2',
    categories: 'mexican,turkish',
  });
});

test('With only User position & distance max', () => {
  expect(
    getFilters({
      localisation: '',
      maxDistance: 20,
      rangePrice: [],
      selectedCategories: [],
      userCoords: {
        latitude: 50.862771099999996,
        longitude: 4.3571238999999995,
      },
    })
  ).toEqual({ localisation: '', radius: 20000, price: '', categories: '' });
});

test('With an empty form and no user location', () => {
  expect(
    getFilters({
      localisation: '',
      maxDistance: 10,
      rangePrice: [],
      selectedCategories: [],
      userCoords: {},
    })
  ).toEqual({ localisation: '', radius: 10000, price: '', categories: '' });
});

// Tests For GetUrl()

test('URL with localisation, 2 prices, 2 categories', () => {
  expect(
    getUrl(
      {
        localisation: 'Los Angeles',
        radius: 20000,
        price: '2, 3',
        categories: 'mexican,hotdogs',
      },
      {}
    )
  ).toEqual(
    'https://api.yelp.com/v3/businesses/search?term=food&location=Los Angeles&radius=20000&price=2, 3&categories=mexican,hotdogs'
  );
});

test('URL with localisation, 0 prices, 1 category', () => {
  expect(
    getUrl(
      {
        localisation: 'Los Angeles',
        radius: 20000,
        price: '',
        categories: 'japanese',
      },
      {}
    )
  ).toEqual(
    'https://api.yelp.com/v3/businesses/search?term=food&location=Los Angeles&radius=20000&categories=japanese'
  );
});

test('URL with localisation & user position, 0 prices, 2 categories', () => {
  expect(
    getUrl(
      {
        localisation: 'Los Angeles',
        radius: 20000,
        price: '',
        categories: 'indpak,lebanese',
      },
      { latitude: 50.862738699999994, longitude: 4.3571789999999995 }
    )
  ).toEqual(
    'https://api.yelp.com/v3/businesses/search?term=food&location=Los Angeles&radius=20000&categories=indpak,lebanese'
  );
});
