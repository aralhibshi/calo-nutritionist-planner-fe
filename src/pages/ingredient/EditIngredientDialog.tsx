import { useEffect, useState } from "react";
import { IIngredientData } from "../../interfaces";
import * as IngredientApi from "../../network/ingredientApi";
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
import IngredientPieChart from "./IngredientPieChart";
import IngredientBarChart from "./IngredientBarChart";
import useIngredientStore from "../../stores/ingredientStore";
import Slider from '@mui/material/Slider';
import Divider from "@mui/material/Divider";
import IngredientComponentTable from "./IngredientComponentTable";
import IngredientMealTable from "./IngredientMealTable";
import LinearProgress from '@mui/material/LinearProgress';

interface EditIngredientDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onIngredientUpdated: (updatedIngredient: IIngredientData) => void;
}

export default function EditIngredientDialog({
  open,
  setOpen,
  onIngredientUpdated,
}: EditIngredientDialogProps) {
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState()
  const closeFormDialog = () => {
    setOpen(false);
  };

  const {
    selectedIngredient,
    editData,
    setEditData
  } = useIngredientStore()

  useEffect(() => {
    if (selectedIngredient) {
      const calculatedCalories =
        Number(selectedIngredient.protein) * 4 +
        Number(selectedIngredient.carbs) * 4 +
        Number(selectedIngredient.fats) * 9;

      const data: any = {
        price: Number(selectedIngredient.price),
        protein: Number(selectedIngredient.protein),
        carbs: Number(selectedIngredient.carbs),
        fats: Number(selectedIngredient.fats),
        calories: parseFloat(calculatedCalories.toFixed(3)),
      }

      if (data.calories > 6.999) {
        data.rating = 'High';
      }
      if (data.calories > 2.500 && data.calories < 6.999) {
        data.rating = 'Normal'
      }
      if (data.calories < 2.500) {
        data.rating = 'Low';
      }

      setEditData(data);
    }
  }, [open]);

  const formik = useFormik({
    initialValues: {
      name: selectedIngredient?.name ?? "",
      category: selectedIngredient?.category ?? "",
      description: selectedIngredient?.description ?? "",
      price: selectedIngredient?.price ?? 0,
      protein: selectedIngredient?.protein ?? 0,
      fats: selectedIngredient?.fats ?? 0,
      carbs: selectedIngredient?.carbs ?? 0,
      unit: selectedIngredient?.unit ?? "ml",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log("Form data:", values);

        if (selectedIngredient) {
          const updatedIngredient = await IngredientApi.updateIngredient(
            selectedIngredient,
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

  const decimalHandleChange = (e: any) => {
    formik.handleChange(e);
  
    const data: any = { ...editData };
    data[e.target.name] = e.target.value;
  
    const calculatedCalories =
      Number(data.protein) * 4 +
      Number(data.carbs) * 4 +
      Number(data.fats) * 9;
  
    data.calories = parseFloat(calculatedCalories.toFixed(3));
  
    if (data.calories > 6.999) {
      data.rating = 'High';
    }
    if (data.calories > 2.500 && data.calories < 6.999) {
      data.rating = 'Normal'
    }
    if (data.calories < 2.500) {
      data.rating = 'Low';
    }

    setEditData(data);
  };

  function formattedCalories() {
    if (editData.calories <= 10.000) {
      return editData.calories * 10
    } else {
      return 100
    }
  }

  function progressColor() {
    if (editData.rating === 'High') {
      return 'error'
    }
    if (editData.rating === 'Normal') {
      return 'primary'
    }
    if (editData.rating === 'Low') {
      return 'warning'
    }
  }

  function sliderColor() {
    if ((editData.protein + editData.carbs + editData.fats) <= 1.000) {
      return 'primary'
    } else {
      return '#D3302F'
    }
  }

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
          <CircularProgress/>
        </Box>
      ) : (
        <Dialog
          open={open}
          onClose={closeFormDialog}
          fullWidth
          maxWidth="lg"
          style={{
            zIndex: '2',
            width: 'auto'
          }}
        >
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Left */}
                <div
                  style={{
                    flex: 0.5,
                    paddingRight: '24px'
                  }}
                >
                  <DialogTitle
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Edit Ingredient
                  </DialogTitle>
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                     <TextField
                      label="Price"
                      name="price"
                      type="number"
                      value={Number(editData?.price)}
                      margin="dense"
                      style={{
                        width: '35%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '65%',
                        marginRight: '22px',
                      }}
                      name='price'
                      defaultValue={Number(selectedIngredient?.price)}
                      max={0.999}
                      step={0.001}
                      onChange={decimalHandleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                     <TextField
                      label="Protein"
                      name="protein"
                      type="number"
                      value={Number(editData?.protein)}
                      margin="dense"
                      style={{
                        width: '35%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '65%',
                        marginRight: '22px',
                        color: sliderColor()
                      }}
                      name='protein'
                      defaultValue={Number(selectedIngredient?.protein)}
                      max={0.999}
                      step={0.001}
                      onChange={decimalHandleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                     <TextField
                      label="Carbs"
                      name="carbs"
                      type="number"
                      value={Number(editData?.carbs)}
                      margin="dense"
                      style={{
                        width: '35%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '65%',
                        marginRight: '22px',
                        color: sliderColor()
                      }}
                      name='carbs'
                      defaultValue={Number(selectedIngredient?.carbs)}
                      max={0.999}
                      step={0.001}
                      onChange={decimalHandleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                     <TextField
                      label="Fats"
                      name="fats"
                      type="number"
                      value={Number(editData?.fats)}
                      margin="dense"
                      style={{
                        width: '35%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '65%',
                        marginRight: '22px',
                        color: sliderColor()
                      }}
                      name='fats'
                      defaultValue={Number(selectedIngredient?.fats)}
                      max={0.999}
                      step={0.001}
                      onChange={decimalHandleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <TextField
                      disabled
                      label="Calories"
                      name="calories"
                      type="number"
                      value={Number(editData?.calories)}
                      margin="dense"
                      style={{
                        width: '30%',
                        marginRight: '30px'
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '55%'
                      }}
                    >
                      <LinearProgress
                        color={progressColor()}
                        aria-label="Calorie"
                        sx={{
                          width: '100%',
                          color: 'blue'
                        }}
                        variant="determinate"
                        value={formattedCalories()}
                      />
                    </div>
                  </div>
                </div>

                <Divider
                  orientation="vertical"
                  flexItem 
                />

                {/* Right */}
                <div
                  style={{
                    flex: 0.5,
                    flexDirection: 'column',
                    height: 'auto'
                  }}
                >
                  <DialogTitle
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Details
                  </DialogTitle>
                  <div
                    style={{
                      flex: 0.5,
                      marginBottom: "15px",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      flexDirection: "row",
                      height: '22%'
                    }}
                  >
                    <IngredientBarChart/>
                    <IngredientPieChart/>
                  </div>

                   <Divider
                      orientation="horizontal"
                      flexItem
                      sx={{
                        marginLeft: '20px'
                      }}
                    />

                  <div
                    style={{
                      textAlign: 'center',
                      height: 'auto'
                    }}
                  >
                    <IngredientComponentTable/>
                    <IngredientMealTable/>
                  </div>
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