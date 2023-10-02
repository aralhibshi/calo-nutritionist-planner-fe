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

  const handleTextfieldChange = (e: any) => {
    const { value, name } = e.target;
    setEditData({ ...editData, [name]: Number(value) });
  };

  const handleTableChange = (e: any) => {
    console.log(e.target.value)
    setcurrentTable(e.target.value);
  };

  const entityTable = currentTable === 'components'
  ? <DialogComponentTable/>
  : currentTable === 'meals'
  ? <DialogMealTable/>
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
          fullScreen
          style={{
            zIndex: '2',
            width: '100%'
          }}
        >
          <DialogContent
            sx={{
              padding: '20px'
            }}
          >
            <form
              onSubmit={formik.handleSubmit}
            >
              <Grid
                container
                xs={12}
                sx={{
                  justifyContent: 'space-between',
                }}
              >

                {/* Section 1*/}

                <Grid
                  item
                  container
                  xs={2.8}
                  sx={{
                    height: '95vh'
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      justifyContent: 'center'
                    }}
                  >
                    <DialogTitle
                      sx={{
                        textAlign: 'center'
                      }}
                    >
                      Edit Ingredient
                    </DialogTitle>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      label="Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      margin='dense'
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      label="Category"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      margin='dense'
                      fullWidth
                    />
                  </Grid>
                  <TextField
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    margin='dense'
                    fullWidth
                  />
                  <FormControl
                    fullWidth
                    margin='dense'
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
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                    >
                      <TextField
                        label="Price"
                        name="price"
                        type="number"
                        margin='dense'
                        value={Number(editData?.price) || ''}
                        onChange={handleTextfieldChange}
                        inputProps={{
                          min: 0,
                          max: 0.999,
                          step: 0.001
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={9}
                      sx={{
                        alignItems: 'center'
                      }}
                    >
                      <Slider
                        sx={{
                          width: '78%',
                          marginRight: '20px',
                          marginLeft: '2rem'
                        }}
                        name='price'
                        defaultValue={Number(selectedIngredient?.price)}
                        value={Number(editData.price)}
                        max={0.999}
                        step={0.001}
                        onChange={handleDecimalChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                    >
                      <TextField
                        label="Protein"
                        name="protein"
                        type="number"
                        value={Number(editData?.protein) || ''}
                        margin='dense'
                        onChange={handleTextfieldChange}
                        inputProps={{
                          min: 0,
                          max: 0.999,
                          step: 0.001
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={9}
                      sx={{
                        alignItems: 'center'
                      }}
                    >
                      <Slider
                        sx={{
                          width: '78%',
                          marginRight: '20px',
                          marginLeft: '2rem',
                          color: sliderColor()
                        }}
                        name='protein'
                        defaultValue={Number(selectedIngredient?.protein)}
                        value={Number(editData.protein)}
                        max={0.999}
                        step={0.001}
                        onChange={handleDecimalChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <Grid
                      item
                      container
                      xs={3}
                    >
                      <TextField
                        label="Carbs"
                        name="carbs"
                        type="number"
                        value={Number(editData?.carbs) || ''}
                        margin='dense'
                        onChange={handleTextfieldChange}
                        inputProps={{
                          min: 0,
                          max: 0.999,
                          step: 0.001
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={9}
                      sx={{
                        alignItems: 'center'
                      }}
                    >
                      <Slider
                        sx={{
                          width: '78%',
                          marginRight: '20px',
                          marginLeft: '2rem',
                          color: sliderColor()
                        }}
                        name='carbs'
                        defaultValue={Number(selectedIngredient?.carbs)}
                        value={Number(editData.carbs)}
                        max={0.999}
                        step={0.001}
                        onChange={handleDecimalChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{
                      alignItems: 'center'
                    }}
                  >
                    <Grid
                      item
                      xs={3}
                    >
                      <TextField
                        label="Fats"
                        name="fats"
                        type="number"
                        value={Number(editData?.fats) || ''}
                        margin='dense'
                        onChange={handleTextfieldChange}
                        inputProps={{
                          min: 0,
                          max: 0.999,
                          step: 0.001
                        }}
                      />
                    </Grid>
                      <Grid
                        item
                        container
                        xs={9}
                        sx={{
                          alignItems: 'center'
                        }}
                      >
                        <Slider
                          sx={{
                            width: '78%',
                            marginRight: '20px',
                            marginLeft: '2rem',
                            color: sliderColor()
                          }}
                          name='fats'
                          defaultValue={Number(selectedIngredient?.fats)}
                        value={Number(editData.fats)}
                          max={0.999}
                          step={0.001}
                          onChange={handleDecimalChange}
                        />
                      </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{
                      alignItems: 'center'
                    }}
                    spacing={1}
                  >
                    <Grid
                      item
                      xs={3.2}
                      marginRight={3}
                    >
                      <TextField
                        disabled
                        label={editData.unitType}
                        name="calories"
                        type="number"
                        value={editData.totalUnit}
                        margin='dense'
                      />
                    </Grid>
                    <Grid
                      item
                      xs={3.2}
                    >
                      <TextField
                        disabled
                        label="Calories"
                        name="calories"
                        type="number"
                        value={Number(editData?.calories)}
                        margin='dense'
                      />
                    </Grid>
                    <Grid
                      item
                      xs={4.6}
                    >
                      <Grid
                        item
                        container
                        xs={12}
                        sx={{
                          alignItems: 'center',
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                        >
                          <Typography
                            variant="body1"
                            fontSize={'15px'}
                            sx={{
                              textAlign: 'center',
                              width: '85%'
                            }}
                          >
                            Calorie Rating
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                        >
                          <LinearProgress
                            color={progressColor()}
                            aria-label="Calorie"
                            sx={{
                              width: '85%',
                              color: 'blue',
                            }}
                            variant="determinate"
                            value={formattedCalories()}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Divider */}

                <Grid
                  item
                  container
                  xs={'auto'}
                  sx={{
                    alignItems: 'center',
                  }}
                >
                  <Divider
                    orientation="vertical"
                    sx={{
                      height: '95%'
                    }}
                  />
                </Grid>

                {/* Section 2 */}

                <Grid
                  item
                  container
                  xs={9}
                  sx={{
                    justifyContent: 'space-between',
                  }}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{
                      alignContent: 'space-between'
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                    >
                      <DialogTitle
                        sx={{
                          textAlign: 'center'
                        }}
                      >
                        Details
                      </DialogTitle>
                    </Grid>

                    {/* Charts */}

                    <Grid
                      item
                      container
                      xs={12}
                      rowSpacing={3}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '30%',
                      }}
                    >
                      <Grid
                        item
                        container
                        xs={5}
                        sx={{
                          height: '100%',
                          alignItems: 'center',
                          paddingTop: 0
                        }}
                      >
                        <IngredientBarChart/>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          height: '75%'
                        }}
                      >
                        <Divider
                          orientation='vertical'
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        xs={5}
                        sx={{
                          height: '100%',
                          alignItems: 'center'
                        }}
                      >
                        <IngredientPieChart/>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{
                          marginLeft: '20px',
                        }}
                      />
                    </Grid>

                    {/* Tables */}

                    <Grid
                      item
                      container
                      xs={12}
                      sx={{
                        textAlign: 'center',
                        height: '70%'
                      }}
                    >
                      <Grid
                        item
                        container
                        xs={12}
                        sx={{
                          height: '12%',
                          alignContent: 'center',
                          justifyContent: 'center',
                          marginTop: '10px',
                          marginBottom: '10px'
                        }}
                      >
                        <ToggleButtonGroup
                          value={currentTable}
                          exclusive
                          onChange={handleTableChange}
                          style={{
                            alignContent: 'center',
                            alignItems: 'center'
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
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          height: '85%'
                        }}
                      >
                        { entityTable }
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{
                      justifyContent: 'right',
                    }}
                  >
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
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}