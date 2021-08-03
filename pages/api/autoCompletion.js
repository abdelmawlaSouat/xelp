import axios from 'axios';

export default async function autoCompletion(req, res) {
  try {
    const { inputValue } = req.body;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=(cities)&key=${process.env.API_KEY_GOOGLE}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).end('Error with the Google API');
  }
}
