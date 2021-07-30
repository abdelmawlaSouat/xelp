import { Grid, Button } from '@material-ui/core';

import css from './FoodCategories.module.css';

const FoodCategories = ({
  selectedCategories,
  handleSelectedCategories,
  allCategories,
}) => (
  <Grid container className={css.foodCategories} spacing={1}>
    {allCategories.map((categorie) => {
      function onClickCategorie() {
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
        <Grid item xs={3} key={categorie.id}>
          <Button
            variant={categorie.isSelected ? 'contained' : 'outlined'}
            color="secondary"
            startIcon={categorie.icon}
            onClick={onClickCategorie}
          >
            {categorie.name}
          </Button>
        </Grid>
      );
    })}
  </Grid>
);

export default FoodCategories;
