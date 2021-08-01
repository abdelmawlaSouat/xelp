const API_BASE_URL = 'https://api.yelp.com/v3';
const PATH = '/businesses/search';

function getFilters(obj) {
  const filters = {
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

function getUrl(filters, userCoords) {
  let url = `${API_BASE_URL}${PATH}?term=food`;
  const { longitude, latitude } = userCoords;

  url += `&longitude=${longitude}&latitude=${latitude}`;
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
      headers: { Authorization: `Bearer ${process.env.API_KEY_YELP}` }, // withCredentials: true,
    });
    const resp = await rawData.json();

    // console.log(req.body);
    console.log(filters);
    console.log(url);
    console.log(resp.businesses);

    res.status(200).json(resp.businesses);
  } catch (error) {
    res.status(500).end('Error with the Yelp API');
  }
}
