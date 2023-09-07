import { useEffect, useState } from "react";
import { IMeal, IMealData } from "../../interfaces";
import * as MealApi from "../../network/mealApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import validationSchema from "../../validation/mealFormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useMealStore from "../../stores/mealStore";
import { FormControl, InputLabel, Divider } from "@mui/material";
import MealSearchBar from "./MealSearchBar";
import MealComponentTable from "./MealComponentTable";
import useComponentStore from "../../stores/componentStore";

interface EditMealDialogProps {
  open: boolean;
  onClose: () => void;
  onMealUpdated: (updatedMeal: IMeal) => void;
  meal: IMealData | null;
}

export default function EditMealDialogProps({
  open,
  onClose,
  meal,
  onMealUpdated,
}: EditMealDialogProps) {
  const [loading, setLoading] = useState(false);
  const { selectedMeal, setSelectedMeal } = useMealStore();
  const { selectedComponents, setSelectedComponents } = useComponentStore();

  const closeFormDialog = () => {
    setSelectedComponents([]);
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      components: selectedMeal?.meals_components ?? [],
      name: selectedMeal?.name ?? "",
      description: selectedMeal?.description ?? "",
      unit: selectedMeal?.unit ?? "",
      size:selectedMeal?.size ?? ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("stuck");
        setLoading(true);
        console.log("Form data:", values);

        if (selectedMeal) {
          console.log("hello there");
          const updatedMeal = await MealApi.updateMeal(selectedMeal, values);
          console.log("Updated component:", updatedMeal);

          onMealUpdated(updatedMeal);
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
    if (selectedComponents.length > 0)
      formik.setFieldValue("components", selectedComponents);
    else
      formik.setFieldValue(
        "components",
        selectedMeal?.meals_components
      );
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
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value="ml">ml</MenuItem>
                    <MenuItem value="g">g</MenuItem>
                  </Select>
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
                  <MealSearchBar />
                  <MealComponentTable/>
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
