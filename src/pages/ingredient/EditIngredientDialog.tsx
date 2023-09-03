import { useState } from "react";
import { IIngredientData } from "../../interfaces";
import * as IngredientsApi from "../../network/ingredientApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import validationSchema from "../../validation/ingredientFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import IngredientDetailModal from "./IngredientDetailModal";

interface EditIngredientDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onIngredientUpdated: (updatedIngredient: IIngredientData) => void;
  ingredient: null | IIngredientData;
}

export default function EditIngredientDialog({
  open,
  setOpen,
  onIngredientUpdated,
  ingredient,
}: EditIngredientDialogProps) {
  const [loading, setLoading] = useState(false);
  const closeFormDialog = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: ingredient?.name ?? "",
      category: ingredient?.category ?? "",
      description: ingredient?.description ?? "",
      price: ingredient?.price ?? 0,
      protein: ingredient?.protein ?? 0,
      fats: ingredient?.fats ?? 0,
      carbs: ingredient?.carbs ?? 0,
      unit: ingredient?.unit ?? "ml",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
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
          open={open}
          onClose={closeFormDialog}
          fullWidth
          maxWidth="lg"
          style={{
            textAlign: "center",
            zIndex: '2'
          }}
        >
          <DialogTitle>Update Ingredient</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                {/* Left */}
                <div
                  style={{
                    flex: 0.5
                  }}
                >
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
                  <FormControl fullWidth>
                    <InputLabel id="unit">Unit</InputLabel>
                    <Select
                      name="unit"
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

                {/* Right */}
                <div
                  style={{
                    flex: 1,
                    flexDirection: 'column'
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      flexDirection: "row"
                    }}
                  >
                    <IngredientDetailModal
                      ingredient={ingredient}
                    />

                    <div>BAR CHART</div>
                  </div>
                    <div>COMPONENT TABLE</div>
                    <div>MEAL TABLE</div>
                </div>
              </div>
              <DialogActions>
                <Button id="secondary-button" onClick={closeFormDialog}>
                  Cancel
                </Button>
                <Button id="primary-button" variant="contained" type="submit">
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
