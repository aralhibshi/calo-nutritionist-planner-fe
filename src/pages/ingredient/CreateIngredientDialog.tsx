import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import * as IngredientApi from "../../network/ingredientApi";
import { IAddIngredientDialogProps } from "../../interfaces";
import { useFormik } from "formik";
import ingredientValidationSchema from "../../validation/ingredientFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import useIngredientStore from "../../stores/ingredientStore";
import useNotificationStore from "../../stores/notificationStore";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Backdrop } from "@mui/material";

export default function CreateIngredientDialog({
  onIngredientAdded,
}: IAddIngredientDialogProps) {
  const [loading, setLoading] = useState(false);
  const {
    addOpen,
    setAddOpen
  } = useIngredientStore();
  const {
    setNotify,
    setMessage
  } = useNotificationStore()

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
    validationSchema: ingredientValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log("Form data:", values);

        const newIngredient = await IngredientApi.createIngredient(values);
        console.log("New ingredient:", newIngredient);

        onIngredientAdded(newIngredient);
        setNotify(true);
        setMessage('Ingredient Created');
        closeFormDialog();
      } catch (error) {
        console.log("Error:", error);
        alert(error);
      } finally {
        setLoading(false);
      }
    },
  });

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
        <Dialog open={addOpen} onClose={closeFormDialog}>
          <DialogTitle>Create Ingredient</DialogTitle>
          <DialogContent>
            <form
              onSubmit={formik.handleSubmit}
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
                  formik.touched.description &&
                  Boolean(formik.errors.description)
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
                inputProps={{
                  min: 0,
                  max: 0.999,
                  step: 0.001
                }}
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
                inputProps={{
                  min: 0,
                  max: 0.999,
                  step: 0.001
                }}
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
                inputProps={{
                  min: 0,
                  max: 0.999,
                  step: 0.001
                }}
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
                inputProps={{
                  min: 0,
                  max: 0.999,
                  step: 0.001
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="unit">Unit</InputLabel>
                <Select
                      name="unit"
                      labelId="unit"
                      value={formik.values.unit}
                      label="Unit"
                      onChange={formik.handleChange}
                      style={{ marginTop: "10px" }}
                    >
                      <MenuItem value={"ml"}>Milliliters</MenuItem>
                      <MenuItem value={"g"}>Grams</MenuItem>
                    </Select>
              </FormControl>
              <DialogActions>
                <Button onClick={closeFormDialog}>
                  Cancel
                </Button>
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
