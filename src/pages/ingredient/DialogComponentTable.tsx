import React, { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, Typography } from "@mui/material";
import * as ComponentApi from "../../network/componentApi";
import useEntityStore from "../../stores/entityStore";
import useIngredientStore from "../../stores/ingredientStore";
import useComponentStore from "../../stores/componentStore";
import { IComponent, IComponentIngredientDetails } from "../../interfaces";
import { useTheme } from "@mui/material/styles";
import useSearchStore from "../../stores/searchStore";
import useTableStore from "../../stores/tableStore";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import { PiHamburgerBold } from 'react-icons/pi';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';

const DialogComponentTable: React.FC = () => {
  const { loading, setLoading } = useEntityStore();
  const { selectedIngredient, editData } = useIngredientStore();
  const {
    selectedComponent,
    setSelectedComponent,
    ingredientComponents,
    setIngredientComponents,
  } = useComponentStore();
  const { setSearchResult } = useSearchStore();
  const {
    height,
    setHeight
  } = useTableStore()

  const theme = useTheme();

  async function loadComponents() {
    try {
      setSearchResult(false);
      setLoading(true);
      if (selectedIngredient) {
        const data = {
          skip: 0,
          take: 200,
          ingredient_id: selectedIngredient.id,
        };
        const response = await ComponentApi.fetchComponents(data);
        setIngredientComponents(response.data.components);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComponents();
  }, []);

  const handleSelectComponent = (component: IComponent) => {
    if(component.name === selectedComponent?.name){
      setSelectedComponent(null)
    }
    else{
      setSelectedComponent(component)
    }
  }

  let componentCount = 0

  return (
    <>
      {loading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <TableContainer
        sx={{
          maxHeight: height,
          overflowX: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            marginLeft: '10px',
            marginRight: '10px'
          }}
          justifyContent='center'
          alignContent='center'
        >
          <Table
            sx={{
              userSelect: "none",
            }}
            id="table"
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "white",
                zIndex: 1
              }}
            >
              <tr>
                <th
                  style={{
                    width: '22%'
                  }}
                >
                  Component Name&nbsp;
                </th>
                <th
                  style={{
                    width: '15%'
                  }}
                >
                  Calories&nbsp;
                </th>
                <th
                  style={{
                    width: '15%'
                  }}
                >
                  Protein&nbsp;
                </th>
                <th
                  style={{
                    width: '15%'
                  }}
                >
                  Carbs&nbsp;
                </th>
                <th
                  style={{
                    width: '15%'
                  }}
                >
                  Fat&nbsp;
                </th>
                <th
                  style={{
                    width: '3%'
                  }}
                >
                  Unit&nbsp;
                </th>
                <th
                  style={{
                    width: '15%'
                  }}
                >
                  Price&nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {ingredientComponents &&
              Array.isArray(ingredientComponents) &&
              ingredientComponents.length > 0 ? (
                ingredientComponents.map(
                  (component: IComponent, index: number) => {
                    const data: IComponentIngredientDetails = {
                      ingredient_id: "",
                      calories: 0,
                      protein: 0,
                      carbs: 0,
                      fats: 0,
                      price: 0,
                      quantity: 0,
                    };
                    const newData: IComponentIngredientDetails = {
                      ingredient_id: "",
                      calories: editData.calories,
                      protein: editData.protein,
                      carbs: editData.carbs,
                      fats: editData.fats,
                      price: editData.price,
                      quantity: 0,
                    };
                    if (
                      component.components_ingredients &&
                      Array.isArray(component.components_ingredients)
                    ) {
                      component.components_ingredients.forEach((el) => {
                        data.ingredient_id = el.ingredient_id;
                        data.protein += Number(el.ingredient.protein);
                        data.carbs += Number(el.ingredient.carbs);
                        data.fats += Number(el.ingredient.fats);
                        data.price += Number(el.ingredient.price);
                        data.quantity += Number(el.ingredient_quantity);
                        
                        if (
                          selectedIngredient &&
                          el.ingredient_id !== selectedIngredient.id
                        ) {
                          newData.protein += Number(el.ingredient.protein);
                          newData.carbs += Number(el.ingredient.carbs);
                          newData.fats += Number(el.ingredient.fats);
                          newData.price += Number(el.ingredient.price);
                          newData.quantity += Number(el.ingredient_quantity);
                        }
                      });
                      data.calories = Number(
                        data.protein * 4 + data.carbs * 4 + data.fats * 9
                      );
                      data.protein = Number(data.protein.toFixed(3));
                      data.carbs = Number(data.carbs.toFixed(3));
                      data.fats = Number(data.fats.toFixed(3));
                      data.calories = Number(data.calories.toFixed(3));
                      data.price = Number(data.price.toFixed(3));
                      newData.calories = Number(
                        newData.protein * 4 + newData.carbs * 4 + newData.fats * 9
                      );
                      newData.protein = Number((newData.protein.toFixed(3)));
                      newData.carbs = Number(newData.carbs.toFixed(3));
                      newData.fats = Number(newData.fats.toFixed(3));
                      newData.calories = Number(newData.calories.toFixed(3));
                      newData.price = Number(newData.price.toFixed(3));
                      componentCount++
                      
                    }
                    return (
                      <tr
                        key={index}
                        style={{
                          height: "52px",
                          backgroundColor: selectedComponent?.id === component.id ? '#DBE8EE' : 'inherit'
                        }}>
                        <td>
                          <Button
                            onClick={() => {
                              handleSelectComponent(component)
                            }}
                            color={selectedComponent?.id === component.id ? 'info' : 'inherit'}
                            variant="text"
                            style={{
                              cursor: 'pointer',
                              fontSize: '18px',
                            }}
                            id={component.id}
                          >
                            {component.name}
                          </Button>
                        </td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            {(data.calories / data.quantity).toFixed(3)}
                            <NavigateNextIcon
                              color='disabled'
                            />
                            <div
                              style={{
                                color:
                                  selectedIngredient &&
                                  newData.calories !== data.calories
                                    ? theme.palette.primary.main
                                    : "inherit",
                              }}
                            >
                              {Number(
                                (newData.calories / (data.quantity)).toFixed(3)
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            {Number((data.protein / data.quantity).toFixed(3))}
                            <NavigateNextIcon
                              color='disabled'
                            />
                            <div
                              style={{
                                color:
                                  selectedIngredient &&
                                  editData.protein !== selectedIngredient.protein
                                    ? theme.palette.primary.main
                                    : "inherit",
                              }}
                            >
                              {Number(
                                (newData.protein / data.quantity).toFixed(3)
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            {Number((data.carbs / data.quantity).toFixed(3))}
                            <NavigateNextIcon
                              color='disabled'
                            />
                            <div
                              style={{
                                color:
                                  selectedIngredient &&
                                  editData.carbs !== selectedIngredient.carbs
                                    ? theme.palette.primary.main
                                    : "inherit",
                              }}
                            >
                              {Number((newData.carbs / data.quantity).toFixed(3))}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            {Number((data.fats / data.quantity).toFixed(3))}
                            <NavigateNextIcon
                              color='disabled'
                            />
                            <div
                              style={{
                                color:
                                  selectedIngredient &&
                                  editData.fats !== selectedIngredient.fats
                                    ? theme.palette.primary.main
                                    : "inherit",
                              }}
                            >
                              {Number((newData.fats / data.quantity).toFixed(3))}
                            </div>
                          </div>
                        </td>
                        <td>{component.unit}</td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            {Number((data.price / data.quantity).toFixed(3))}
                            <NavigateNextIcon
                              color='disabled'
                            />
                            <div
                              style={{
                                color:
                                  selectedIngredient &&
                                  editData.price !== selectedIngredient.price
                                    ? theme.palette.primary.main
                                    : "inherit",
                              }}
                            >
                              {Number((newData.price / data.quantity).toFixed(3))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan={8}>No components found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Grid>
      </TableContainer>

      <Grid
        container
        item
        xs={12}
        sx={{
          marginRight: 5,
          marginTop: 2,
          color: 'primary.main'
        }}
      >
        <Grid
          item
          container
          xs={6}
          style={{
          }}
        > 
          {selectedComponent &&(
            <Typography
              variant="h6"
              style={{
                marginLeft: '32px'
              }}
            >
              Selected Component: {selectedComponent?.name}
              <Button onClick={()=> {
                setSelectedComponent(null)
              }}><CloseIcon/></Button>
            </Typography>
          )}
        </Grid>
        <Grid
          item
          container
          xs={6}
          style={{
            justifyContent: 'end'
          }}
        >
            <Tooltip
              title='Number of Components'
              followCursor
            >
              <div
                style={{
                  display: 'flex',
                }}
              >
                <PiHamburgerBold
                  style={{
                    scale: '120%',
                    translate: '0 0.45rem'
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    marginRight: '32px',
                    cursor: 'default'
                  }}
                >
                  { `: ${componentCount}` }
                </Typography>
              </div>
            </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default DialogComponentTable;