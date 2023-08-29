import { useState } from "react";
import { IComponent, IComponentData, IIngredientData } from "../../interfaces";
import * as componentsApi from "../../network/componentApi";
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

interface EditComponentDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onComponentUpdated: (updatedComponent: IComponent) => void;
  component: null | IComponentData;
}

export default function EditComponentDialog({
  open,
  setOpen,
  onComponentUpdated,
  component,
}: EditComponentDialogProps) {
  const [loading, setLoading] = useState(false);
  const closeFormDialog = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: component?.name ?? "",
      category: component?.category ?? "",
      description: component?.description ?? "",
      ingredients: component?.ingredients ?? [],
      unit: component?.unit ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('stuck')
        setLoading(true);
        console.log("Form data:", values);

        if (component) {
            console.log('hello there')
          const updatedComponent = await componentsApi.updateComponent(
            component,
            values
          );
          console.log("Updated component:", updatedComponent);

          onComponentUpdated(updatedComponent);
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
                label="Ingredients"
                name="Ingredients"
                value={formik.values.ingredients}
                onChange={formik.handleChange}
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
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="g">g</MenuItem>
              </Select>
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
