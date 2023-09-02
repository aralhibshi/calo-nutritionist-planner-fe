import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as componentsApi from "../../network/componentApi";
import {
  IAddComponentDialogProps,
  IComponentIngredientDataArray,
} from "../../interfaces";
import { useFormik } from "formik";
import componentValidationSchema from "../../validation/componentFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Tag from "./Tag";
import useComponentStore from "../../stores/componentStore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useEntityStore from "../../stores/entityStore";
import ComponentSearchBar from "./ComponentSearchBar";
import ComponentIngredientTable from "./ComponentIngredientTable";
import useIngredientStore from "../../stores/ingredientStore";

export default function AddComponentDialog({
  onComponentAdded,
}: IAddComponentDialogProps) {
  const [loading, setLoading] = useState(false);
  const { addOpen, setAddOpen } = useComponentStore();

  const { selectedIngredients } = useIngredientStore();

  const closeFormDialog = () => {
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

        const newComponent = await componentsApi.createComponent(values);
        console.log("New component:", newComponent);

        onComponentAdded(newComponent);
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
          <DialogTitle>Add Component</DialogTitle>
          <DialogContent>
            <form onSubmit={handleFormSubmit}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left side */}
                <div style={{ flex: 1 }}>
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
                      labelId="unit"
                      id="unit"
                      value={formik.values.unit}
                      label="Unit"
onChange={formik.handleChange}
                      style={{ marginTop: "10px" }}
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
                    marginBottom:'20px',
                    display: "flex",
                    justifyContent: "column",
                    alignItems: "center",
                    flexDirection: "column",
                    marginLeft: "20px"
                  }}
                >
                  <ComponentSearchBar/>
                  <ComponentIngredientTable/>
                </div>
              </div>

              <DialogActions>
                <Button onClick={closeFormDialog}>Cancel</Button>
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
