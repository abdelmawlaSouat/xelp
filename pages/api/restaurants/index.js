const API_BASE_URL = 'https://api.yelp.com/v3';
const PATH = '/businesses/search';

export function getFilters(obj) {
  const filters = {
    localisation: obj.localisation,
    radius: obj.maxDistance * 1000,
    price: '',
    categories: '',
  };
  const { rangePrice, selectedCategories: categories } = obj;

  rangePrice.forEach((price) => {
    filters.price += price.value;
    if (rangePrice.indexOf(price) < rangePrice.length - 1) {
      filters.price += ', ';
    }
  });

  categories.forEach((categorie) => {
    filters.categories += categorie.value;
    if (categories.indexOf(categorie) < categories.length - 1) {
      filters.categories += ',';
    }
  });

  return filters;
}

export function getUrl(filters, userCoords) {
  let url = `${API_BASE_URL}${PATH}?term=food`;
  const { longitude, latitude } = userCoords;

  if (filters.localisation) {
    url += `&location=${filters.localisation}`;
  } else {
    url += `&longitude=${longitude}&latitude=${latitude}`;
  }
  url += `&radius=${filters.radius}`;
  if (filters.price !== '') {
    url += `&price=${filters.price}`;
  }
  if (filters.categories.length > 0) {
    url += `&categories=${filters.categories}`;
  }

  return url;
}

export default async function restaurants(req, res) {
  try {
    const { userCoords } = req.body;
    const filters = getFilters(req.body);
    const url = getUrl(filters, userCoords);
    const rawData = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` },
    });
    const resp = await rawData.json();

    resp.businesses.sort(
      (a, b) => b.review_count - a.review_count || b.rating - a.rating
    );

    res.status(200).json(resp.businesses.slice(0, 10));
  } catch (error) {
    res.status(500).end('Error with the Yelp API');
  }
}
