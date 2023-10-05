import { useEffect, useState } from "react";
import { IComponent, IComponentData } from "../../interfaces";
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
import useComponentStore from "../../stores/componentStore";
import useIngredientStore from "../../stores/ingredientStore";
import { Divider } from "@mui/material";
import ComponentSearchBar from "./ComponentSearchBar";
import ComponentIngredientTable from "./ComponentIngredientTable";
import useNotificationStore from "../../stores/notificationStore";
import { Backdrop } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const { selectedComponent, setSelectedComponent } = useComponentStore();
  const { selectedIngredients, setSelectedIngredients, calories } =
    useIngredientStore();
  const {
    setNotify,
    setMessage
  } = useNotificationStore()

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
        console.log("stuck");
        setLoading(true);
        console.log("Form data:", values);

        if (selectedComponent) {
          console.log("hello there");
          const updatedComponent = await ComponentApi.updateComponent(
            selectedComponent,
            values
          );
          console.log("Updated component:", updatedComponent);

          onComponentUpdated(updatedComponent);
        }
        setNotify(true);
        setMessage('Component Updated')
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
    if (selectedIngredients.length > 0)
      formik.setFieldValue("ingredients", selectedIngredients);
    else
      formik.setFieldValue(
        "ingredients",
        selectedComponent?.components_ingredients
      );
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
          style={{ textAlign: "center" }}
          fullWidth
          maxWidth="lg"
          open={open}
          onClose={closeFormDialog}
        >
          <DialogTitle>Update Component</DialogTitle>
          <DialogContent>
            <form onSubmit={handleFormSubmit}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
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
                  <FormControl
                    fullWidth
                    style={{
                      marginBottom:'15px'
                    }}
                  >
                    <InputLabel
                      id='category'
                    >
                      Category
                    </InputLabel>
                    <Select
                      name='category'
                      labelId='category'
                      value={formik.values.category}
                      label='Category'
                      onChange={formik.handleChange}
                      style={{
                        textAlign: 'left'
                      }}
                    >
                      <MenuItem
                        value={'Condiments & Sauces'}
                      >
                        Condiments & Sauces
                      </MenuItem>
                      <MenuItem
                        value={'Dairy & Alternatives'}
                      >
                        Dairy & Alternatives
                      </MenuItem>
                      <MenuItem
                        value={'Fats & Oils'}
                      >
                        Fats & Oils
                      </MenuItem>
                      <MenuItem
                        value={'Fruits'}
                      >
                        Fruits
                      </MenuItem>
                      <MenuItem
                        value={'Grains & Cereals'}
                      >
                        Grains & Cereals
                      </MenuItem>
                      <MenuItem
                        value={'Nuts & Seeds'}
                      >
                        Nuts & Seeds
                      </MenuItem>
                      <MenuItem
                        value={'Proteins'}
                      >
                        Proteins
                      </MenuItem>
                      <MenuItem
                        value={'Vegetables'}
                      >
                        Vegetables
                      </MenuItem>
                    </Select>
                  </FormControl>
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
                    style={{
                      textAlign: 'left'
                    }}
                  >
                    <MenuItem value="ml">ml</MenuItem>
                    <MenuItem value="g">g</MenuItem>
                  </Select>
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginLeft: "20px" }}
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
export {};
