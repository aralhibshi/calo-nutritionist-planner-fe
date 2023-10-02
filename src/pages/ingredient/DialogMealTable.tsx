import React, { useEffect } from "react";
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
  let mealCount=0


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
              {ingredientMeals &&
              Array.isArray(ingredientMeals) &&
              ingredientMeals.length > 0 ? (
                ingredientMeals.map((meal: IMeal, index: number) => {
                  const componentArray: any = [];
                  let iquantity = 0

                  const data: IComponentIngredientDetails = {
                    ingredient_id: "",
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    price: 0,
                    quantity: iquantity,

                  };
                  const newData: IComponentIngredientDetails = {
                    ingredient_id: "",
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    price: 0,
                    quantity: iquantity,
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

                      componentArray.push(el.component_id);

                      const quantity = Number(el.component_quantity);
                      el.component.components_ingredients?.forEach(
                        (el: IComponentIngredient) => {

                          data.ingredient_id = el.ingredient_id;
                          data.protein += Number(
                            el.ingredient.protein * el.ingredient_quantity
                          );
                          data.carbs += Number(
                            el.ingredient.carbs * el.ingredient_quantity
                          );
                          data.fats += Number(
                            el.ingredient.fats * el.ingredient_quantity
                          );
                          data.price += Number(
                            el.ingredient.price * el.ingredient_quantity
                          );

                          iquantity += Number(el.ingredient_quantity)
                          if (
                            selectedIngredient &&
                            el.ingredient_id !== selectedIngredient.id
                          ) {
                            newData.protein += Number(
                              el.ingredient.protein * el.ingredient_quantity
                            );
                            newData.carbs += Number(
                              el.ingredient.carbs * el.ingredient_quantity
                            );
                            newData.fats += Number(
                              el.ingredient.fats * el.ingredient_quantity
                            );
                            newData.price += Number(
                              el.ingredient.price * el.ingredient_quantity
                            );

                            newData.quantity += Number(el.ingredient_quantity)
                          }
                          else{
                            newData.protein += Number(
                              editData.protein*el.ingredient_quantity
                            );
                            newData.carbs += Number(
                              editData.carbs*el.ingredient_quantity
                            );
                            newData.fats += Number(
                              editData.fats*el.ingredient_quantity
                            );
                            newData.price += Number(
                              editData.price*el.ingredient_quantity
                            );
                            
                          }
                        }
                      );

                      data.protein /= iquantity
                      data.fats /= iquantity
                      data.price /= iquantity
                      data.carbs /= iquantity

                      data.protein += Number(
                        (data.protein * quantity).toFixed(3)
                      );
                      data.carbs += Number((data.carbs * quantity).toFixed(3));
                      data.fats += Number((data.fats * quantity).toFixed(3));
                      data.price += Number((data.price * quantity).toFixed(3));
                      data.calories = Number(
                        data.protein * 4 + data.carbs * 4 + data.fats * 9
                      );


                      newData.protein /= iquantity
                      newData.fats /= iquantity
                      newData.price /= iquantity
                      newData.carbs /= iquantity

                      newData.protein += Number(
                        (newData.protein * quantity).toFixed(3)
                      );
                      newData.carbs += Number(
                        (newData.carbs * quantity).toFixed(3)
                      );
                      newData.fats += Number(
                        (newData.fats * quantity).toFixed(3)
                      );
                      newData.price += Number(
                        (newData.price * quantity).toFixed(3)
                      );
                      newData.calories = Number(
                        newData.protein * 4 + newData.carbs * 4 + newData.fats * 9
                      );
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
                          {(data.calories).toFixed(3)}
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
                              (newData.calories).toFixed(3)
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
                          {data.protein.toFixed(3)}
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
                            {newData.protein.toFixed(3)}
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
                          {data.carbs.toFixed(3)}
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
                            {newData.carbs.toFixed(3)}
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
                          {data.fats.toFixed(3)}
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
                            {newData.fats.toFixed(3)}
                          </div>
                        </div>
                      </td>
                      <td>{meal.unit}</td>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          {data.price.toFixed(3)}
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
                            {newData.price.toFixed(3)}
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