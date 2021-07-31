import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import {
  GiSushis,
  GiPizzaSlice,
  GiFrenchFries,
  GiCookingPot,
  GiHamburger,
  GiTacos,
  GiKebabSpit,
  GiIndianPalace,
} from 'react-icons/gi';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
// import PlacesAutocomplete from './InputPlacesAutoComplete';
import css from './BusinessResearchForm.module.css';

import FoodCategories from './FoodCategories';

const PrettoSlider = withStyles({
  root: {
    color: '#f50057',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,

    '&:focus, &:hover, &€active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const allCategories = [
  {
    id: 1,
    name: 'Japanese Food',
    icon: <GiSushis />,
    isSelected: false,
  },
  {
    id: 2,
    name: 'Italian Food',
    icon: <GiPizzaSlice />,
    isSelected: false,
  },
  {
    id: 3,
    name: 'Belgian Food',
    icon: <GiFrenchFries />,
    isSelected: false,
  },
  {
    id: 4,
    name: 'Lebanese Food',
    icon: <GiCookingPot />,
    isSelected: false,
  },
  {
    id: 5,
    name: 'Japanese Food',
    icon: <GiHamburger />,
    isSelected: false,
  },
  {
    id: 6,
    name: 'Mexican Food',
    icon: <GiTacos />,
    isSelected: false,
  },
  {
    id: 7,
    name: 'Turkish Food',
    icon: <GiKebabSpit />,
    isSelected: false,
  },
  {
    id: 8,
    name: 'Indian Food',
    icon: <GiIndianPalace />,
    isSelected: false,
  },
];

const priceTypes = [
  {
    id: 1,
    value: '€',
    isSelected: false,
  },
  {
    id: 2,
    value: '€€',
    isSelected: false,
  },
  {
    id: 3,
    value: '€€€',
    isSelected: false,
  },
  {
    id: 4,
    value: '€€€€',
    isSelected: false,
  },
];

const RestaurantResearchForm = ({ handleBusinesses }) => {
  const [localisation, setLocalisation] = useState('');
  const [maxDistance, setMaxDistance] = useState(10);
  const [rangePrice, setRangePrice] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userCoords, setUserCoords] = useState({});

  function getUserPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => console.warn(`ERREUR (${err.code}): ${err.message}`)
    );
  }

  useEffect(() => {
    getUserPosition();
  }, []);

  async function searchRestaurants() {
    const researchParams = {
      localisation,
      maxDistance,
      rangePrice,
      selectedCategories,
      userCoords,
    };

    if ('geolocation' in navigator) {
      try {
        getUserPosition();
        const response = await axios.post('api/restaurants', researchParams);
        handleBusinesses(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function onCLickRangePrice(price) {
    let newArray = [];
    const togglePrice = price;

    togglePrice.isSelected = !togglePrice.isSelected;
    newArray = rangePrice.filter((c) => c.id !== togglePrice.id);
    if (togglePrice.isSelected) {
      newArray.push(togglePrice);
    }
    setRangePrice(newArray);
    console.log(newArray);
  }

  return (
    <>
      <Card className={css.container}>
        <form>
          <div className={css.InputsContainer}>
            <FormControl>
              <TextField
                name="localisation"
                label="City"
                onChange={(e) => setLocalisation(e.target.value)}
              />
            </FormControl>

            <div className={css.priceTypes}>
              <span>Price (€)</span>
              {priceTypes.map((price) => (
                <Button
                  key={price.id}
                  variant={price.isSelected ? 'contained' : 'outlined'}
                  color="secondary"
                  value={price.id}
                  size="small"
                  onClick={() => onCLickRangePrice(price)}
                >
                  {price.value}
                </Button>
              ))}
            </div>

            <div className={css.sliderContainer}>
              <span>Max Distance (km)</span>
              <PrettoSlider
                id="max_distance"
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                value={maxDistance}
                min={0}
                max={20}
                onChange={(e, newValue) => setMaxDistance(newValue)}
              />
            </div>
          </div>

          <FoodCategories
            selectedCategories={selectedCategories}
            handleSelectedCategories={(newArray) =>
              setSelectedCategories(newArray)
            }
            allCategories={allCategories}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={searchRestaurants}
          >
            Search
          </Button>
          {/* <PlacesAutocomplete /> */}
        </form>
      </Card>
    </>
  );
};

export default RestaurantResearchForm;