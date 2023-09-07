import { useEffect, useState } from "react";
import { IComponent, IComponentData, IIngredientData } from "../../interfaces";
import * as ComponentApi from "../../network/componentApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import validationSchema from "../../validation/componentFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useComponentStore from "../../stores/componentStore";
import useIngredientStore from "../../stores/ingredientStore";
import { FormControl, InputLabel,Divider } from "@mui/material";
import ComponentSearchBar from "./ComponentSearchBar";
import ComponentIngredientTable from "./ComponentIngredientTable";

interface EditComponentDialogProps {
    open: boolean;
    onClose: () => void;
  onComponentUpdated: (updatedComponent: IComponent) => void;
  component: IComponentData | null;

}

export default function EditComponentDialog({
    open,
    onClose,
    component,
  onComponentUpdated,
}: EditComponentDialogProps) {

  const [loading, setLoading] = useState(false);
  const {selectedComponent, setSelectedComponent } = useComponentStore();
  const { selectedIngredients, setSelectedIngredients, calories } = useIngredientStore();
  

  const closeFormDialog = () => {
    setSelectedIngredients([]);
    formik.resetForm();
    onClose();
  };


  const formik = useFormik({
    initialValues: {
      ingredients: selectedComponent?.components_ingredients ?? [],
      name: selectedComponent?.name ?? "",
      category: selectedComponent?.category ?? "",
      description: selectedComponent?.description ?? "",
      unit: selectedComponent?.unit ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('stuck')
        setLoading(true);
        console.log("Form data:", values);

        if (selectedComponent) {
            console.log('hello there')
          const updatedComponent = await ComponentApi.updateComponent(
            selectedComponent,
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    formik.handleSubmit(e);
  };

  useEffect(() => {
    if(selectedIngredients.length > 0)
      formik.setFieldValue("ingredients", selectedIngredients);
    else
      formik.setFieldValue("ingredients",selectedComponent?.components_ingredients)
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
        <Dialog open={open} onClose={closeFormDialog}>
          <DialogTitle>Update Component</DialogTitle>
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
export {}