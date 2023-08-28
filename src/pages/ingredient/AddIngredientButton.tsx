import React from 'react'
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useIngredientStore from '../../store/ingredientStore';

const AddIngredientButton = () => {
  const { setAddOpen } = useIngredientStore();

  return (
    <Button
      variant='contained'
      type="submit"
      onClick={() => setAddOpen(true)}
      style={{
        fontWeight: 'bold',
        scale: '70%'
      }}
    >
      Add Ingredient &nbsp;
      <FontAwesomeIcon
        icon={[
          'fas',
          'square-plus'
        ]}
        style={{
          scale: '140%',
          cursor: 'pointer'
        }}
      />
    </Button>
  )
}

export default AddIngredientButton;