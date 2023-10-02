import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as ComponentApi from "../../network/componentApi";
import { IAddComponentDialogProps } from "../../interfaces";
import { useFormik } from "formik";
import componentValidationSchema from "../../validation/componentFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import useComponentStore from "../../stores/componentStore";
import { FormControl, InputLabel, MenuItem, Select, Divider } from "@mui/material";
import ComponentSearchBar from "./ComponentSearchBar";
import ComponentIngredientTable from "./ComponentIngredientTable";
import useIngredientStore from "../../stores/ingredientStore";
import useNotificationStore from "../../stores/notificationStore";
import { Backdrop } from "@mui/material";

export default function CreateComponentDialog({
  onComponentAdded,
}: IAddComponentDialogProps) {
  const [loading, setLoading] = useState(false);
  const {
    addOpen,
    setAddOpen
  } = useComponentStore();
  const {
    selectedIngredients,
    setSelectedIngredients
  } = useIngredientStore();
  const {
    setNotify,
    setMessage
  } = useNotificationStore();

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

        const response = await ComponentApi.createComponent(values);
        setSelectedIngredients([])
        console.log("New component:", response);
        onComponentAdded(response);
        setNotify(true);
        setMessage('Component Created');
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
    // Check if any ingredients are selected
    if (selectedIngredients.length === 0) {
      // No ingredients selected, show a message to the user
      setNotify(true);
      setMessage('Please select at least one ingredient.');
      return; // Prevent form submission
    }
    formik.handleSubmit(e);
  };

  useEffect(() => {
    formik.setFieldValue("ingredients", selectedIngredients);
  }, [selectedIngredients]);

  return (
    <>
      {loading ? (
        <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                    style={{marginBottom:'15px'}}
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
                    style={{marginBottom:'15px'}}
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
                    style={{marginBottom:'20px'}}
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
                        textAlign: 'left'
                      }}
                    >
                      <MenuItem value={"ml"}>Milliliters</MenuItem>
                      <MenuItem value={"g"}>Grams</MenuItem>
                    </Select>
                  </FormControl>

                </div>
                <Divider
                  orientation="vertical"
                  flexItem 
                  style={{marginLeft:'20px'}}
                />

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
