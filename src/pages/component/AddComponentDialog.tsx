import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as componentsApi from "../../network/componentApi";
import { IAddComponentDialogProps, IAddIngredientDialogProps } from "../../interfaces";
import { useFormik } from "formik";
import validationSchema from "../../validation/componentFormValidation";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useIngredientStore from "../../stores/ingredientStore";
import useComponentStore from "../../stores/componentStore";
import { MenuItem, Select } from "@mui/material";

export default function AddComponentDialog({
  onComponentAdded,
}: IAddComponentDialogProps) {
  const [loading, setLoading] = useState(false);
  const { addOpen, setAddOpen } = useComponentStore();

  const closeFormDialog = () => {
    formik.resetForm();
    setAddOpen(false);
  };

  // id?: string
  // name: string;
  // category?: string;
  // description?: string;
  // ingredients?: Array<IComponentIngredientDataArray>
  // unit: string;

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      ingredients: [],
      unit: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        console.log("Form data:", values);

        const newComponent = await componentsApi.createComponent(values);
        console.log("New component:", newComponent);

        onComponentAdded(newComponent);
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
        <DialogTitle>Add Component</DialogTitle>
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
              label="Ingredients"
              name="Ingredients"
              type="number"
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
              helperText={formik.touched.ingredients && formik.errors.ingredients}
              fullWidth
              margin="dense"
            />
              <Select
                label="Unit"
                name="unit"
                value={formik.values.unit}
                onChange={formik.handleChange}
                fullWidth
                margin="dense"
              >
                <MenuItem value="ml">Milliliters (ml)</MenuItem>
                <MenuItem value="g">Grams (g)</MenuItem>
              </Select>
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
