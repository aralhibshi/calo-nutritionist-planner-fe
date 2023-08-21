import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box } from '@mui/material';

interface SearchToggleButtonProps {
  selectedValue: string;
  onAlignmentChange: (newAlignment: string) => void;
}

const ColorToggleButton = ({
  selectedValue,
  onAlignmentChange
}: SearchToggleButtonProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    onAlignmentChange(newAlignment);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '2vh',
        mt:'30vh'
      }}
    >
      <ToggleButtonGroup
        color="primary"
        value={selectedValue}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="ingredient">Ingredient</ToggleButton>
        <ToggleButton value="component">Component</ToggleButton>
        <ToggleButton value="meal">Meal</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ColorToggleButton;