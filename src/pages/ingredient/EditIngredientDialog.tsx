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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import IngredientPieChart from "./IngredientPieChart";
import IngredientBarChart from "./IngredientBarChart";
import useIngredientStore from "../../stores/ingredientStore";
import useNotificationStore from "../../stores/notificationStore";
import Slider from '@mui/material/Slider';
import Divider from "@mui/material/Divider";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DialogComponentTable from "./DialogComponentTable";
import DialogMealTable from "./DialogMealTable";
import { Backdrop } from "@mui/material";
import Grid from "@mui/material/Grid";


interface EditIngredientDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onIngredientUpdated: (updatedIngredient: IIngredientData) => void;
  calculateData: (useCase:string, data: any) => void;
  formattedCalories: () => number;
  progressColor: () => 'error' | 'primary' | 'warning' | undefined;
  sliderColor: () => string | undefined;
}

export default function EditIngredientDialog({
  open,
  setOpen,
  onIngredientUpdated,
  calculateData,
  formattedCalories,
  progressColor,
  sliderColor
}: EditIngredientDialogProps) {
  const [loading, setLoading] = useState(false);
  const [currentTable, setcurrentTable] = useState('components')
  const closeFormDialog = () => {
    setOpen(false);
  };
  const {
    selectedIngredient,
    editData,
    setEditData
  } = useIngredientStore();
  const {
    setNotify,
    setMessage
  } = useNotificationStore()

  useEffect(() => {
    if (selectedIngredient) {
      calculateData('useEffect', selectedIngredient);
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
        setNotify(true);
        setMessage('Ingredient Updated')
        closeFormDialog();
      } catch (error) {
        console.log("Error:", error);
        alert(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDecimalChange = (e: any) => {
    formik.handleChange(e);

    const data: any = { ...editData };
    data[e.target.name] = e.target.value;

    calculateData('decimalChange', data);
  };

  const handleUnitChange = (e: any) => {
    formik.handleChange(e)

    const data = {...editData}
    data.unitType = 'Total ' + e.target.value;

    setEditData(data);
  }

  const handleTableChange = (e: any) => {
    console.log(e.target.value)
    setcurrentTable(e.target.value);
  };

  const entityTable = currentTable === 'components'
  ? <DialogComponentTable/>
  : currentTable === 'meals'
  ?<DialogMealTable/>
  : null;

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
          open={open}
          onClose={closeFormDialog}
          maxWidth={false}
          style={{
            zIndex: '2',
            width: '100%',
          }}
        >
          <DialogContent>
            <form
              onSubmit={formik.handleSubmit}
            >
              <Grid
                item
                container
                xs={12}
                sx={{
                  justifyContent: 'space-between'
                }}
              >
                {/* Left */}
                <Grid
                  item
                  container
                  xs={3.3}
                  sx={{
                    flexDirection: 'column'
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
                  <FormControl
                    fullWidth
                  >
                    <InputLabel
                    id="unit"
                    >
                      Unit
                    </InputLabel>
                    <Select
                      name="unit"
                      labelId="unit"
                      value={formik.values.unit}
                      label="Unit"
                      onChange={handleUnitChange}
                      style={{
                        marginTop: "10px",
                        textAlign: 'left'
                      }}
                    >
                      <MenuItem
                        value={"ml"}
                      >
                        Milliliters
                      </MenuItem>
                      <MenuItem
                        value={"g"}
                      >
                        Grams
                      </MenuItem>
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
                        width: '30%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '70%',
                        marginRight: '22px',
                      }}
                      name='price'
                      defaultValue={Number(selectedIngredient?.price)}
                      max={0.999}
                      step={0.001}
                      onChange={handleDecimalChange}
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
                        width: '30%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '70%',
                        marginRight: '22px',
                        color: sliderColor()
                      }}
                      name='protein'
                      defaultValue={Number(selectedIngredient?.protein)}
                      max={0.999}
                      step={0.001}
                      onChange={handleDecimalChange}
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
                        width: '30%',
                        marginRight: '30px'
                      }}
                    />
                    <Slider
                      sx={{
                        width: '70%',
                        marginRight: '22px',
                        color: sliderColor()
                      }}
                      name='carbs'
                      defaultValue={Number(selectedIngredient?.carbs)}
                      max={0.999}
                      step={0.001}
                      onChange={handleDecimalChange}
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
                      width: '30%',
                      marginRight: '30px'
                    }}
                  />
                  <Slider
                    sx={{
                      width: '70%',
                      marginRight: '22px',
                      color: sliderColor()
                    }}
                    name='fats'
                    defaultValue={Number(selectedIngredient?.fats)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
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
                      label={editData.unitType}
                      name="calories"
                      type="number"
                      value={editData.totalUnit}
                      margin="dense"
                      style={{
                        width: '38%',
                        marginRight: '30px',
                      }}
                    />
                    <TextField
                      disabled
                      label="Calories"
                      name="calories"
                      type="number"
                      value={Number(editData?.calories)}
                      margin="dense"
                      style={{
                        width: '35%',
                        marginRight: '30px'
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40%',
                        textAlign: 'center',
                        marginRight: '22px'
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontSize={'15px'}
                      >
                        Calorie Rating
                      </Typography>
                      <LinearProgress
                        color={progressColor()}
                        aria-label="Calorie"
                        sx={{
                          width: '100%',
                          color: 'blue',
                        }}
                        variant="determinate"
                        value={formattedCalories()}
                      />
                    </div>
                  </div>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                />
                {/* Right */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      flex: 0.5,
                      flexDirection: 'column',
                      alignContent: 'space-between'
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
                        height: '150px'
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
                      <ToggleButtonGroup
                        value={currentTable}
                        exclusive
                        onChange={handleTableChange}
                        style={{
                          marginTop: '20px',
                          marginBottom: '20px'
                        }}
                      >
                        <ToggleButton
                          value="components"
                          aria-label="components"
                          color="primary"
                        >
                          Components
                        </ToggleButton>
                        <ToggleButton
                          value="meals"
                          aria-label="meals"
                          color="primary"
                        >
                          Meals
                        </ToggleButton>
                      </ToggleButtonGroup>
                      { entityTable }
              
                    </div>
                  </div>
                  <DialogActions
                    style={{
                      position: "relative",
                      top: 0
                    }}
                  >
                    <Button
                      id="secondary-button"
                      onClick={closeFormDialog}
                    >
                      Cancel
                    </Button>
                    <Button
                      id="primary-button"
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                  </DialogActions>
                </div>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}