import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useEntityStore from '../../stores/entityStore';

const SearchTypeDropdown: React.FC = () => {
  const {
    entity,
    setEntity,
    setSkip,
    setCurrentPage
  } = useEntityStore();


  const handleChange = (event: SelectChangeEvent) => {
    setEntity(event.target.value);
    setSkip(0);
    setCurrentPage(1);
    console.log(event.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: 160,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
        >
          Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={entity}
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