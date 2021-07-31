import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import css from './FoodCategories.module.css';

const FoodCategories = ({
  selectedCategories,
  handleSelectedCategories,
  allCategories,
}) => {
  function onClickCategorie(categorie) {
    let newSelectedCategoriesList = [];
    const toggleCategorie = categorie;

    toggleCategorie.isSelected = !toggleCategorie.isSelected;
    newSelectedCategoriesList = selectedCategories.filter(
      (c) => c.id !== toggleCategorie.id
    );
    if (toggleCategorie.isSelected) {
      newSelectedCategoriesList.push(toggleCategorie);
    }
    handleSelectedCategories(newSelectedCategoriesList);
  }

  return (
    <Grid container className={css.foodCategories} spacing={2}>
      {allCategories.map((categorie) => (
        <Grid item xs={2} key={categorie.id}>
          <Button
            variant={categorie.isSelected ? 'contained' : 'outlined'}
            color="secondary"
            size="small"
            startIcon={categorie.icon}
            onClick={() => onClickCategorie(categorie)}
          >
            {categorie.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

FoodCategories.propTypes = {
  handleSelectedCategories: PropTypes.func.isRequired,
  selectedCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      icon: PropTypes.element,
      isSelected: PropTypes.bool,
    })
  ).isRequired,
  allCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      icon: PropTypes.element,
      isSelected: PropTypes.bool,
    })
  ).isRequired,
};

export default FoodCategories;
