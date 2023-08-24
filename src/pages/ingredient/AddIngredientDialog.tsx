import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import * as IngredientsApi from '../../network/ingredientApi';
import { ICreateIngredientInput } from '../../interfaces/ingredient';

interface AddIngredientDialogProps {
  onIngredientAdded: (newIngredient: ICreateIngredientInput) => void;
}

export default function AddIngredientDialog({ onIngredientAdded }: AddIngredientDialogProps) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<ICreateIngredientInput>({
    name: '',
    category: '',
    description: '',
    price: 0,
    protein: 0,
    fats: 0,
    carbs: 0,
    unit: '',
  });

  const openFormDialog = () => {
    setOpen(true);
  };

  const closeFormDialog = () => {
    setOpen(false);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      console.log('Form data:', formData);
  
      const newIngredient = await IngredientsApi.createIngredient(formData);
      console.log('New ingredient:', newIngredient);
  
      onIngredientAdded(newIngredient);
      closeFormDialog();

    } catch (error) {
      console.log('Error:', error);
      alert(error);
    }
  };

  return (
    <>
    <div  style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
      <Button variant="contained" color='primary' onClick={openFormDialog}>
        Add Ingredient
      </Button>
      </div>
      <Dialog open={open} onClose={closeFormDialog}>
        <DialogTitle>Add Ingredient</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Protein"
            name="protein"
            type="number"
            value={formData.protein}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Fats"
            name="fats"
            type="number"
            value={formData.fats}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Carbs"
            name="carbs"
            type="number"
            value={formData.carbs}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Unit"
            name="unit"
            value={formData.unit}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFormDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}