import { useState } from 'react';

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
import css from './RestaurantResearchForm.module.css';

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

    '&:focus, &:hover, &$active': {
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

const RestaurantResearchForm = () => {
  const [localisation, setLocalisation] = useState('');
  const [maxDistance, setMaxDistance] = useState(30);
  const [rangePrice, setRangePrice] = useState([10, 40]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  function searchRestaurants() {
    console.log({
      localisation,
      maxDistance,
      rangePrice,
      selectedCategories,
    });
  }

  function onChangeRangePrice(e, newValue) {
    setRangePrice(newValue);
  }

  function handleSelectedCategories(newArray) {
    setSelectedCategories(newArray);
  }

  return (
    <>
      <Card className={css.container}>
        <form>
          <FormControl fullWidth>
            <TextField
              name="localisation"
              label="City"
              onChange={(e) => setLocalisation(e.target.value)}
            />
          </FormControl>

          <div className={css.sliderContainer}>
            <span>Max Distance (km)</span>
            <PrettoSlider
              id="max_distance"
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              value={maxDistance}
              onChange={(e, newValue) => setMaxDistance(newValue)}
            />
          </div>

          <div className={css.sliderContainer}>
            <span>Price (€)</span>
            <PrettoSlider
              valueLabelDisplay="auto"
              getAriaLabel={(index) =>
                index === 0 ? 'Minimum price' : 'Maximum price'
              }
              value={rangePrice}
              onChange={onChangeRangePrice}
            />
          </div>

          <FoodCategories
            selectedCategories={selectedCategories}
            handleSelectedCategories={handleSelectedCategories}
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