import React, { useEffect, useState } from "react";
import { ICreateIngredientInput } from "../../interfaces/ingredient";
import * as IngredientsApi from "../../network/ingredientApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import validationSchema from "../../validation/formValidation";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface EditIngredientDialogProps {
  onIngredientUpdated: (updatedIngredient: ICreateIngredientInput) => void;
  ingredient: null | ICreateIngredientInput;
}

export default function EditIngredientDialog({
  onIngredientUpdated,
  ingredient,
}: EditIngredientDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeFormDialog = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   // if (ingredient !== null) {
  //   //   setOpen(true);
  //   // }
  // }, [ingredient]);

  const formik = useFormik({
    initialValues: {
      name: ingredient?.name ?? "",
      category: ingredient?.category ?? "",
      description: ingredient?.description ?? "",
      price: ingredient?.price ?? 0,
      protein: ingredient?.protein ?? 0,
      fats: ingredient?.fats ?? 0,
      carbs: ingredient?.carbs ?? 0,
      unit: ingredient?.unit ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        console.log("Form data:", values);

        if (ingredient) {
          const updatedIngredient = await IngredientsApi.updateIngredient(
            ingredient,
            values
          );
          console.log("Updated ingredient:", updatedIngredient);

          onIngredientUpdated(updatedIngredient);
        }

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

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Edit Ingredient
        </Button>
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
      <Dialog open={open} onClose={closeFormDialog}>
        <DialogTitle>Update Ingredient</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
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
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>)}
    </>
  );
}
