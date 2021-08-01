export default async function autoCompletion(req, res) {
  try {
    const { inputValue } = req.body;

    const rawData = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=(cities)&key=${process.env.API_KEY_GOOGLE}`
    );
    const resp = await rawData.json();
    // console.log(resp);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).end('Error with the Google API');
  }
}
