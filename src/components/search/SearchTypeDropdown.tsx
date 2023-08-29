import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useSearchStore from '../../store/searchStore';

const SearchTypeDropdown: React.FC = (props) => {
  const { searchEntity, setSearchEntity } = useSearchStore();

  const handleChange = (event: SelectChangeEvent) => {
    setSearchEntity(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{
      minWidth: 140,
      display: 'flex',
      alignItems: 'center'
      }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchEntity}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'ingredient'}>Ingredients</MenuItem>
          <MenuItem value={'component'}>Components</MenuItem>
          <MenuItem value={'meal'}>Meals</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchTypeDropdown;