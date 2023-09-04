import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as componentsApi from "../../network/componentApi";
import {
  IAddComponentDialogProps
} from "../../interfaces";
import { useFormik } from "formik";
import componentValidationSchema from "../../validation/componentFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useComponentStore from "../../stores/componentStore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ComponentSearchBar from "./ComponentSearchBar";
import ComponentIngredientTable from "./ComponentIngredientTable";
import useIngredientStore from "../../stores/ingredientStore";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function CreateComponentDialog({
  onComponentAdded,
}: IAddComponentDialogProps) {
  const [loading, setLoading] = useState(false);
  const { addOpen, setAddOpen } = useComponentStore();
  const { selectedIngredients, setSelectedIngredients } = useIngredientStore();

  const closeFormDialog = () => {
    setSelectedIngredients([])
    formik.resetForm();
    setAddOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      ingredients: [],
      unit: "",
    },
    validationSchema: componentValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log("Form data:", values);

        const response = await componentsApi.createComponent(values);
        setSelectedIngredients([])
        console.log("New component:", response);
        onComponentAdded(response);
        closeFormDialog();
      } catch (error) {
        console.log("Error:", error);
        alert(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  useEffect(() => {
    formik.setFieldValue("ingredients", selectedIngredients);
  }, [selectedIngredients]);

  return (
    <>
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
        <Dialog
          open={addOpen}
          onClose={closeFormDialog}
          fullWidth
          maxWidth="lg" // Set maxWidth to "md" for more width
          style={{ textAlign: "center" }}
        >
          <DialogTitle>Create Component</DialogTitle>
          <DialogContent>
            <form onSubmit={handleFormSubmit}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {/* Left side */}
                <div
                  style={{
                    flex: 0.5,
                  }}
                >
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
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
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
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    fullWidth
                    margin="dense"
                  />
                  <FormControl fullWidth>
                    <InputLabel id="unit">Unit</InputLabel>
                    <Select
                      name="unit" // Add the id attribute
                      labelId="unit"
                      value={formik.values.unit}
                      label="Unit"
                      onChange={formik.handleChange}
                      style={{
                        marginTop: "10px",
                        textAlign: 'left'
                      }}
                    >
                      <MenuItem value={"ml"}>Milliliters</MenuItem>
                      <MenuItem value={"g"}>Grams</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Right side */}
                <div
                  style={{
                    flex: 1,
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "column",
                    alignItems: "center",
                    flexDirection: "column",
                    marginLeft: "20px",
                  }}
                >       
                  <ComponentSearchBar />
                  <ComponentIngredientTable />
                </div>
              </div>

              <DialogActions>
                <Button onClick={closeFormDialog}>Cancel</Button>
                <Button variant="contained" type="submit">
                Create
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
