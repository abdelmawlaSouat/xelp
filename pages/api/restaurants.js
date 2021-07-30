// import queryString from 'query-string';

const API_BASE_URL = 'https://api.yelp.com/v3';

// export function get(path, params) {
//   const query = queryString.stringify(params);

//   return fetch(`${API_BASE_URL}${path}?${query}`, {
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_YELP}`,
//       Origin: 'localhost',
//       withCredentials: true,
//     },
//   });
// }
// https://api.yelp.com/v3/businesses/search?location=paris

export default async function restaurants(req, res) {
  try {
    const {
      userCoords,
      localisation,
      maxDistance,
      rangePrice,
      selectedCategories,
    } = req.body;

    console.log(req.body);
    // console.log(
    //   `${API_BASE_URL}/businesses/search?term=food&longitude=${userCoords.longitude}&latitude=${userCoords.latitude}`
    // );

    const rawData = await fetch(
      `${API_BASE_URL}/businesses/search?term=food&longitude=${userCoords.longitude}&latitude=${userCoords.latitude}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY_YELP}`,
          Origin: 'localhost',
          withCredentials: true,
        },
      }
    );
    const resp = await rawData.json();

    console.log(resp.businesses);

    // const filteredArray = resp.businesses.map((item) => {
    //   const { id, name, image_url,  } = item;

    //   return {
    //     id,
    //     name,
    //     image_url,
    //   };
    // });

    // console.log(filteredArray);

    res.status(200).json(resp.businesses);
  } catch (error) {
    res.status(500).end('Error with the Yelp API');
  }
}
