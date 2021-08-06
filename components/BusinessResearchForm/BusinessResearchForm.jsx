import { useState, useEffect } from 'react';
import axios from 'axios';
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
import PropTypes from 'prop-types';
import CityAutoCompleteField from '../CityAutoCompleteField';
import css from './BusinessResearchForm.module.css';

import FoodCategories from '../FoodCategories/FoodCategories';

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
    value: 'japanese',
    name: 'Japanese Food',
    icon: <GiSushis />,
    isSelected: false,
  },
  {
    id: 2,
    value: 'italian',
    name: 'Italian Food',
    icon: <GiPizzaSlice />,
    isSelected: false,
  },
  {
    id: 3,
    value: 'belgian',
    name: 'Belgian Food',
    icon: <GiFrenchFries />,
    isSelected: false,
  },
  {
    id: 4,
    value: 'lebanese',
    name: 'Lebanese Food',
    icon: <GiCookingPot />,
    isSelected: false,
  },
  {
    id: 5,
    value: 'hotdogs',
    name: 'Fast Food',
    icon: <GiHamburger />,
    isSelected: false,
  },
  {
    id: 6,
    value: 'mexican',
    name: 'Mexican Food',
    icon: <GiTacos />,
    isSelected: false,
  },
  {
    id: 7,
    value: 'turkish',
    name: 'Turkish Food',
    icon: <GiKebabSpit />,
    isSelected: false,
  },
  {
    id: 8,
    value: 'indpak',
    name: 'Indian Food',
    icon: <GiIndianPalace />,
    isSelected: false,
  },
];

const priceTypes = [
  {
    value: 1,
    label: '€',
    isSelected: false,
  },
  {
    value: 2,
    label: '€€',
    isSelected: false,
  },
  {
    value: 3,
    label: '€€€',
    isSelected: false,
  },
  {
    value: 4,
    label: '€€€€',
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
      // eslint-disable-next-line no-console
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
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  function onCLickRangePrice(price) {
    let newArray = [];
    const togglePrice = price;

    togglePrice.isSelected = !togglePrice.isSelected;
    newArray = rangePrice.filter((p) => p.value !== togglePrice.value);
    if (togglePrice.isSelected) {
      newArray.push(togglePrice);
    }
    setRangePrice(newArray);
  }

  return (
    <>
      <Card className={css.container} data-testid="business-research-form">
        <form autoComplete="off">
          <div className={css.InputsContainer}>
            <CityAutoCompleteField
              handleLocalisation={(newValue) => setLocalisation(newValue)}
            />

            <div className={css.priceTypes}>
              <span>Price (€)</span>
              <div>
                {priceTypes.map((price) => (
                  <Button
                    key={price.value}
                    variant={price.isSelected ? 'contained' : 'outlined'}
                    color="secondary"
                    value={price.value}
                    size="small"
                    onClick={() => onCLickRangePrice(price)}
                  >
                    {price.label}
                  </Button>
                ))}
              </div>
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
        </form>
      </Card>
    </>
  );
};

RestaurantResearchForm.propTypes = {
  handleBusinesses: PropTypes.func.isRequired,
};

export default RestaurantResearchForm;
