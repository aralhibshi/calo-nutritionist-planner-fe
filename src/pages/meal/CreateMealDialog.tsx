import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as ComponentApi from "../../network/componentApi";
import * as mealsApi from "../../network/mealApi"
import {
  IAddComponentDialogProps, IAddMealDialogProps
} from "../../interfaces";
import { useFormik } from "formik";
import componentValidationSchema from "../../validation/componentFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useMealStore from "../../stores/mealStore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import MealSearchBar from "./MealSearchBar";
import MealComponentTable from "./MealComponentTable";
import useComponentStore from "../../stores/componentStore";
import mealValidationSchema from "../../validation/mealFormValidation";

export default function CreateMealDialog({
  onMealAdded,
}: IAddMealDialogProps) {
  const [loading, setLoading] = useState(false);
  const { addOpen, setAddOpen } = useMealStore();
  const { selectedComponents, setSelectedComponents } = useComponentStore();

  const closeFormDialog = () => {
    setSelectedComponents([])
    formik.resetForm();
    setAddOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      components: [],
      unit: "",
      size: ""
    },
    validationSchema: mealValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log("Form data:", values);

        const response = await mealsApi.createMeal(values);
        setSelectedComponents([])
        console.log("New meal:", response);
        onMealAdded(response);
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
    formik.setFieldValue("components", selectedComponents);
  }, [selectedComponents]);

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
          <DialogTitle>Create Meal</DialogTitle>
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
                  <FormControl fullWidth>
                    <InputLabel id="size">Size</InputLabel>
                    <Select
                      name="size" // Add the id attribute
                      labelId="size"
                      value={formik.values.size}
                      label="Size"
                      onChange={formik.handleChange}
                      style={{
                        marginTop: "10px",
                        textAlign: 'left'
                      }}
                    >
                      <MenuItem value={"L"}>Large</MenuItem>
                      <MenuItem value={"M"}>Medium</MenuItem>
                      <MenuItem value={"S"}>Small</MenuItem>
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
                  <MealSearchBar/>
                  <MealComponentTable/>
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
