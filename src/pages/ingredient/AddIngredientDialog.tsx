import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import * as IngredientsApi from '../../network/ingredientApi';
import { ICreateIngredientInput } from '../../interfaces/ingredient';
import { useFormik } from 'formik';

interface AddIngredientDialogProps {
  onIngredientAdded: (newIngredient: ICreateIngredientInput) => void;
}

export default function AddIngredientDialog({ onIngredientAdded }: AddIngredientDialogProps) {
  const [open, setOpen] = useState(false);

  const closeFormDialog = () => {
    setOpen(false);
  };
  
  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      description: '',
      price: 0,
      protein: 0,
      fats: 0,
      carbs: 0,
      unit: '',
    },
    onSubmit: async (values) => {
      try {
        console.log('Form data:', values);

        const newIngredient = await IngredientsApi.createIngredient(values);
        console.log('New ingredient:', newIngredient);

        onIngredientAdded(newIngredient);
        closeFormDialog();
      } catch (error) {
        console.log('Error:', error);
        alert(error);
      }
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button variant="contained" color='primary' onClick={() => setOpen(true)}>
          Add Ingredient
        </Button>
      </div>
      <Dialog open={open} onClose={closeFormDialog}>
        <DialogTitle>Add Ingredient</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Protein"
              name="protein"
              type="number"
              value={formik.values.protein}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Fats"
              name="fats"
              type="number"
              value={formik.values.fats}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Carbs"
              name="carbs"
              type="number"
              value={formik.values.carbs}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Unit"
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
              fullWidth
              margin="dense"
            />
            <DialogActions>
              <Button onClick={closeFormDialog}>Cancel</Button>
              <Button variant="contained" type="submit">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}