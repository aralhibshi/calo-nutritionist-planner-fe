import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, Typography } from "@mui/material";
import * as MealApi from "../../network/mealApi";
import useIngredientStore from "../../stores/ingredientStore";
import useMealStore from "../../stores/mealStore";
import useComponentStore from "../../stores/componentStore";
import useEntityStore from "../../stores/entityStore";
import useTableStore from "../../stores/tableStore";
import {
  IComponentIngredient,
  IComponentIngredientDetails,
  IMeal,
  IMealComponent,
} from "../../interfaces";
import { useTheme } from "@mui/material/styles";
import useSearchStore from "../../stores/searchStore";
import Grid from "@mui/material/Grid";
import { MdOutlineFastfood } from 'react-icons/md'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Tooltip from '@mui/material/Tooltip';

const DialogMealTable: React.FC = () => {
  const [calculationArray, setCalculationArray] = useState<any[]>([]);
  const { loading, setLoading } = useEntityStore();
  const { selectedIngredient, editData } = useIngredientStore();
  const { ingredientMeals, setIngredientMeals } = useMealStore();
  const { setSearchResult } = useSearchStore();
  const {
    height
  } = useTableStore();
  const { selectedComponent } =
    useComponentStore();

  const theme = useTheme();

  async function loadMeals() {
    try {
      setSearchResult(false);
      setLoading(true);
      if (selectedIngredient) {
        const data = {
          skip: 0,
          take: 200,
          ingredient_id: selectedIngredient.id,
        };
        const response = await MealApi.fetchMeals(data);
        console.log(response);
        setIngredientMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  let count = 0;
  let mealCount= 0

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
            marginLeft: "10px",
            marginRight: "10px",
          }}
          justifyContent="center"
          alignContent="center"
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
              }}
            >
              <tr>
                <th
                  style={{
                    width: '22%'
                  }}
                >
                  Meal Name&nbsp;
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
                    width: '15%'
                  }}
                >
                  Price&nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {ingredientMeals &&
              Array.isArray(ingredientMeals) &&
              ingredientMeals.length > 0 ? (
                ingredientMeals.map((meal: IMeal, index: number) => {
                  const componentArray: any = [];
                  let iquantity = 0

                  const mealData: any = {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    price: 0,
                  };
                  const newMealData: any = {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    price: 0,
                  };
                  if (
                    meal.meals_components &&
                    Array.isArray(meal.meals_components) &&
                    meal.meals_components.length > 0
                  ) {
                    meal.meals_components?.forEach((el: IMealComponent) => {
                      if (selectedComponent?.id === el.component_id) {
                        count++;
                      }
                      
                      const componentData: any = {
                        calories: 0,
                        protein: 0,
                        carbs: 0,
                        fats: 0,
                        price: 0,
                        quantity: 0

                      };

                      const newComponentData: any = {
                        calories: 0,
                        protein: 0,
                        carbs: 0,
                        fats: 0,
                        price: 0,
                        quantity: 0
                      };

                      componentArray.push(el.component_id);

                      const quantity = Number(el.component_quantity);
                      el.component.components_ingredients?.forEach(
                        (el: IComponentIngredient) => {
                          componentData.protein += Number(el.ingredient.protein * el.ingredient_quantity);
                          componentData.carbs += Number(el.ingredient.carbs * el.ingredient_quantity);
                          componentData.fats += Number(el.ingredient.fats * el.ingredient_quantity);
                          componentData.price += Number(el.ingredient.price * el.ingredient_quantity);
                          componentData.quantity += Number(el.ingredient_quantity)

                          if (selectedIngredient && el.ingredient_id !== selectedIngredient.id) {
                            newComponentData.protein += Number(el.ingredient.protein * el.ingredient_quantity);
                            newComponentData.carbs += Number(el.ingredient.carbs * el.ingredient_quantity);
                            newComponentData.fats += Number(el.ingredient.fats * el.ingredient_quantity);
                            newComponentData.price += Number(el.ingredient.price * el.ingredient_quantity);
                            newComponentData.quantity += Number(el.ingredient_quantity)
                          }
                          else{
                            newComponentData.protein += Number(editData.protein*el.ingredient_quantity);
                            newComponentData.carbs += Number(editData.carbs*el.ingredient_quantity);
                            newComponentData.fats += Number(editData.fats*el.ingredient_quantity);
                            newComponentData.price += Number(editData.price*el.ingredient_quantity);
                            newComponentData.quantity += Number(el.ingredient_quantity)
                          }
                        }
                      );

                      componentData.protein /= componentData.quantity
                      componentData.fats /= componentData.quantity
                      componentData.price /= componentData.quantity
                      componentData.carbs /= componentData.quantity

                      mealData.protein += Number((componentData.protein * quantity).toFixed(3));
                      mealData.carbs += Number((componentData.carbs * quantity).toFixed(3));
                      mealData.fats += Number((componentData.fats * quantity).toFixed(3));
                      mealData.price += Number((componentData.price * quantity).toFixed(3));
                      mealData.calories = Number((mealData.protein * 4 + mealData.carbs * 4 + mealData.fats * 9).toFixed(3));

                      newComponentData.protein /= newComponentData.quantity
                      newComponentData.fats /= newComponentData.quantity
                      newComponentData.price /= newComponentData.quantity
                      newComponentData.carbs /= newComponentData.quantity

                      newMealData.protein += Number((newComponentData.protein * quantity).toFixed(3));
                      newMealData.carbs += Number((newComponentData.carbs * quantity).toFixed(3));
                      newMealData.fats += Number((newComponentData.fats * quantity).toFixed(3));
                      newMealData.price += Number((newComponentData.price * quantity).toFixed(3));
                      newMealData.calories = Number((newMealData.protein * 4 + newMealData.carbs * 4 + newMealData.fats * 9).toFixed(3));
                    });

                    mealCount++
                  }

                  return (
                    <tr
                      key={index}
                      style={{
                        height: "52px",
                        backgroundColor: componentArray.includes(
                          selectedComponent?.id
                        )
                          ? "#DBE8EE"
                          : "inherit",
                      }}
                    >
                      <td>{meal.name}</td>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          {(mealData.calories).toFixed(3)}
                          <NavigateNextIcon
                            color='disabled'
                          />
                          <div
                            style={{
                              color:
                                selectedIngredient &&
                                newMealData.calories !== mealData.calories
                                  ? theme.palette.primary.main
                                  : "inherit",
                            }}
                          >
                            {Number(
                              (newMealData.calories).toFixed(3)
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
                          {mealData.protein.toFixed(3)}
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
                            {newMealData.protein.toFixed(3)}
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
                          {mealData.carbs.toFixed(3)}
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
                            {newMealData.carbs.toFixed(3)}
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
                          {mealData.fats.toFixed(3)}
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
                            {newMealData.fats.toFixed(3)}
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
                          {mealData.price.toFixed(3)}
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
                            {newMealData.price.toFixed(3)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8}>No meals found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Grid>
      </TableContainer>
      <Grid
        item
        container
        xs={12}
        sx={{
          marginRight: 5,
          marginTop: 2,
          color: 'primary.main',
          }}
        >
        <Grid
          item
          container
          xs={6}
          style={{
            justifyContent: 'start'
          }}
        >
          <Typography
            variant="h6"
            style={{
              justifyContent: 'start',
              marginLeft: '32px',
            }}
          >
            { `Meals containing selected component: ${count}` }
          </Typography>
        </Grid>
        
        <Grid
          item
          container
          xs={6}
          style={{
            justifyContent: 'end',
          }}
        >
          <Tooltip
            title='Number of Meals'
            followCursor
          >
            <div
              style={{
                display: 'flex'
              }}
            >
              <MdOutlineFastfood
                style={{
                  scale: '120%',
                  translate: '0 0.33rem'
                }}
              />
              <Typography
                variant="h6"
                style={{
                  marginRight: '32px',
                  cursor: 'default'
                }}
              >
                { `: ${mealCount}` }
              </Typography>
            </div>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default DialogMealTable;