import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

function PlacesAutocomplete({ handleLocalisation }) {
  const [, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  async function onInputChange(newInputValue) {
    setInputValue(newInputValue);
    const response = await axios.post('api/autoCompletion', {
      inputValue: newInputValue,
    });
    setOptions(response.data.predictions);
    console.log(response.data.predictions);
  }

  return (
    <Autocomplete
      style={{ width: 200 }}
      getOptionLabel={(option) => option.description}
      getOptionSelected={(option, val) => option.place_id === val.place_id}
      options={options}
      autoComplete
      onChange={(event, newValue) => {
        const inputVal = newValue
          ? newValue.structured_formatting.main_text
          : '';
        setOptions(newValue ? [newValue, ...options] : options);
        setInputValue(inputVal);
        handleLocalisation(inputVal);
      }}
      onInputChange={(e, newValue) => onInputChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="City, Departement"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}

export default PlacesAutocomplete;
