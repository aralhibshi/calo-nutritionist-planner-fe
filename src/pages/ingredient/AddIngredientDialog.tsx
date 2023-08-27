import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as IngredientsApi from "../../network/ingredientApi";
import { IAddIngredientDialogProps } from "../../interfaces";
import { useFormik } from "formik";
import validationSchema from "../../validation/formValidation";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function AddIngredientDialog({
  onIngredientAdded,
  addOpen,
  setAddOpen
}: IAddIngredientDialogProps) {
  const [loading, setLoading] = useState(false);

  const closeFormDialog = () => {
    formik.resetForm();
    setAddOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      protein: 0,
      fats: 0,
      carbs: 0,
      unit: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        console.log("Form data:", values);

        const newIngredient = await IngredientsApi.createIngredient(values);
        console.log("New ingredient:", newIngredient);

        onIngredientAdded(newIngredient);
        closeFormDialog();
      } 
      catch (error) {
        console.log("Error:", error);
        alert(error);
      }
      finally {
        setLoading(false);
      }
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
      </div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
      <Dialog open={addOpen} onClose={closeFormDialog}>
        <DialogTitle>Add Ingredient</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              fullWidth
              margin="dense"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Protein"
              name="protein"
              type="number"
              value={formik.values.protein}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.protein && Boolean(formik.errors.protein)}
              helperText={formik.touched.protein && formik.errors.protein}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Fats"
              name="fats"
              type="number"
              value={formik.values.fats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fats && Boolean(formik.errors.fats)}
              helperText={formik.touched.fats && formik.errors.fats}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Carbs"
              name="carbs"
              type="number"
              value={formik.values.carbs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.carbs && Boolean(formik.errors.carbs)}
              helperText={formik.touched.carbs && formik.errors.carbs}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Unit"
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.unit && Boolean(formik.errors.unit)}
              helperText={formik.touched.unit && formik.errors.unit}
              fullWidth
              margin="dense"
            />
            <DialogActions>
              <Button onClick={closeFormDialog}>Cancel</Button>
              <Button variant="contained" type='submit'>
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>)}
    </>
  );
}
