import { useEffect, useState } from "react";
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
import IngredientPieChart from "./IngredientPieChart";
import IngredientBarChart from "./IngredientBarChart";
import useIngredientStore from "../../stores/ingredientStore";
import Slider from '@mui/material/Slider';

interface EditIngredientDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onIngredientUpdated: (updatedIngredient: IIngredientData) => void;
}

export default function EditIngredientDialog({
  open,
  setOpen,
  onIngredientUpdated,
  // ingredient,
}: EditIngredientDialogProps) {
  const [loading, setLoading] = useState(false);
  const closeFormDialog = () => {
    setOpen(false);
  };

  const {
    selectedIngredient,
    decimalData,
    setDecimalData
  } = useIngredientStore()

  useEffect(() => {
    setDecimalData({
      price: Number(selectedIngredient?.price),
      protein: Number(selectedIngredient?.protein),
      carbs: Number(selectedIngredient?.carbs),
      fats: Number(selectedIngredient?.fats)
    })
  }, [open])

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
          const updatedIngredient = await IngredientsApi.updateIngredient(
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
    formik.handleChange(e)

    const data: any = {...decimalData};

    data[e.target.name] = e.target.value;

    setDecimalData(data);
  }

  function valuetext(value: number) {
    return `${value}°C`;
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
                      value={Number(decimalData?.price)}
                      margin="dense"
                      style={{
                        width: '30%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '65%',
                        marginRight: '20px'
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
                      value={Number(decimalData?.protein)}
                      margin="dense"
                      style={{
                        width: '30%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '65%',
                        marginRight: '20px'
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
                      value={Number(decimalData?.carbs)}
                      margin="dense"
                      style={{
                        width: '30%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '65%',
                        marginRight: '20px'
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
                      value={Number(decimalData?.fats)}
                      margin="dense"
                      style={{
                        width: '30%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '65%',
                        marginRight: '20px'
                      }}
                      name='fats'
                      defaultValue={Number(selectedIngredient?.fats)}
                      max={0.999}
                      step={0.001}
                      onChange={decimalHandleChange}
                    />
                  </div>
                  {/* <TextField
                    label="Fats"
                    name="fats"
                    type="number"
                    value={formik.values.fats}
                    onChange={decimalHandleChange}
                    fullWidth
                    margin="dense"
                    inputProps={{
                      maxLength: 0.999 
                    }}
                  /> */}
                  {/* <TextField
                    label="Carbs"
                    name="carbs"
                    type="number"
                    value={formik.values.carbs}
                    onChange={decimalHandleChange}
                    fullWidth
                    margin="dense"
                    inputProps={{
                      maxLength: 0.999 
                    }}
                  /> */}
                </div>

                {/* Right */}
                <div
                  style={{
                    flex: 0.5,
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      flex: 0.5,
                      marginBottom: "15px",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      flexDirection: "row",
                      height: '30%'
                    }}
                  >
                    <IngredientBarChart/>
                    <IngredientPieChart/>
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
