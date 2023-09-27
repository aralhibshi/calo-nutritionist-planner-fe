import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as MealApi from "../../network/mealApi";
import useIngredientStore from "../../stores/ingredientStore";
import useMealStore from "../../stores/mealStore";
import useEntityStore from "../../stores/entityStore";
import {
  IComponentIngredient,
  IComponentIngredientDetails,
  IMeal,
  IMealComponent,
} from "../../interfaces";
import { useTheme } from "@mui/material/styles";
import useSearchStore from "../../stores/searchStore";
import { AiOutlineArrowDown } from "react-icons/ai";
import Grid from "@mui/material/Grid";

const DialogMealTable: React.FC = () => {
  const { loading, setLoading } = useEntityStore();
  const { selectedIngredient, editData } = useIngredientStore();
  const { ingredientMeals, setIngredientMeals } = useMealStore();
  const { setSearchResult } = useSearchStore();

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
          maxHeight: 305,
          overflowX: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            margin: '0 20px 0 20px',
            maxHeight: '30vh'
          }}
        >
          <Table
            sx={{
              margin: "0 0 0 20px",
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
              <th>Meal Name&nbsp;</th>
              <th>Calories&nbsp;</th>
              <th>Protein&nbsp;</th>
              <th>Carbs&nbsp;</th>
              <th>Fat&nbsp;</th>
              <th>Unit&nbsp;</th>
              <th>Price&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {ingredientMeals &&
            Array.isArray(ingredientMeals) &&
            ingredientMeals.length > 0 ? (
              ingredientMeals.map((meal: IMeal, index: number) => {
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
                  meal.meals_components &&
                  Array.isArray(meal.meals_components) &&
                  meal.meals_components.length > 0
                ) {
                  meal.meals_components?.map((el: IMealComponent) => {
                    const quantity = Number(el.component_quantity);

                    el.component.components_ingredients?.map(
                      (el: IComponentIngredient) => {
                        const ingredientQuantity = Number(el.ingredient_quantity)
                        data.ingredient_id = el.ingredient_id;
                        data.protein += Number(
                          el.ingredient.protein * ingredientQuantity
                        );
                        data.carbs += Number(el.ingredient.carbs * ingredientQuantity);
                        data.fats += Number(el.ingredient.fats * ingredientQuantity);
                        data.price += Number(el.ingredient.price * ingredientQuantity);
                        if (
                          selectedIngredient &&
                          el.ingredient_id !== selectedIngredient.id
                        ) {
                          newData.protein += Number(el.ingredient.protein * ingredientQuantity);
                          newData.carbs += Number(el.ingredient.carbs *ingredientQuantity);
                          newData.fats += Number(el.ingredient.fats*ingredientQuantity);

                          newData.price += Number(el.ingredient.price*ingredientQuantity);

                        }
                      }
                    );
                    data.protein = Number((data.protein*quantity).toFixed(3));
                    data.protein = Number((data.carbs*quantity).toFixed(3));
                    data.protein = Number((data.fats*quantity).toFixed(3));
                    data.protein = Number((data.price*quantity).toFixed(3));

                    newData.protein = Number((newData.protein*quantity).toFixed(3));
                    newData.protein = Number((newData.carbs*quantity).toFixed(3));
                    newData.protein = Number((newData.fats*quantity).toFixed(3));
                    newData.protein = Number((newData.price*quantity).toFixed(3));

                  });
                  data.calories = Number(
                    data.protein * 4 + data.carbs * 4 + data.fats * 9
                  );

                  newData.calories = Number(
                    newData.protein * 4 + newData.carbs * 4 + newData.fats * 9
                  );

                }
                return (
                  <tr key={index} style={{ height: "52px" }}>
                    <td>{meal.name}</td>
                    <td>
                      {data.calories.toFixed(3)} <br />
                      <AiOutlineArrowDown />
                      <br /> {newData.calories.toFixed(3)}
                    </td>
                    <td
                      style={{
                        color:
                          selectedIngredient &&
                          editData.protein !== selectedIngredient.protein
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {data.protein.toFixed(3)} <br />
                      <AiOutlineArrowDown />
                      <br /> {newData.protein.toFixed(3)}
                    </td>
                    <td
                      style={{
                        color:
                          selectedIngredient &&
                          editData.carbs !== selectedIngredient.carbs
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {data.carbs.toFixed(3)} <br />
                      <AiOutlineArrowDown />
                      <br /> {newData.carbs.toFixed(3)}
                    </td>
                    <td
                      style={{
                        color:
                          selectedIngredient &&
                          editData.fats !== selectedIngredient.fats
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {data.fats.toFixed(3)} <br />
                      <AiOutlineArrowDown />
                      <br /> {newData.fats.toFixed(3)}
                    </td>
                    <td>{meal.unit}</td>
                    <td
                      style={{
                        color:
                          selectedIngredient &&
                          editData.price !== selectedIngredient.price
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {data.price.toFixed(3)} <br />
                      <AiOutlineArrowDown />
                      <br /> {newData.price.toFixed(3)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th>Meal Name&nbsp;</th>
                <th>Calories&nbsp;</th>
                <th>Protein&nbsp;</th>
                <th>Carbs&nbsp;</th>
                <th>Fat&nbsp;</th>
                <th>Unit&nbsp;</th>
                <th>Price&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {ingredientMeals &&
              Array.isArray(ingredientMeals) &&
              ingredientMeals.length > 0 ? (
                ingredientMeals.map((meal: IMeal, index: number) => {
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
                    meal.meals_components &&
                    Array.isArray(meal.meals_components) &&
                    meal.meals_components.length > 0
                  ) {
                    meal.meals_components?.map((el: IMealComponent) => {
                      const quantity = Number(el.component_quantity);
                      el.component.components_ingredients?.map(
                        (el: IComponentIngredient) => {
                          data.ingredient_id = el.ingredient_id;
                          data.protein += Number(
                            el.ingredient.protein * quantity
                          );
                          data.carbs += Number(el.ingredient.carbs * quantity);
                          data.fats += Number(el.ingredient.fats * quantity);
                          data.price += Number(el.ingredient.price * quantity);
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
                        }
                      );
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
                    newData.protein = Number(newData.protein.toFixed(3));
                    newData.carbs = Number(newData.carbs.toFixed(3));
                    newData.fats = Number(newData.fats.toFixed(3));
                    newData.calories = Number(newData.calories.toFixed(3));
                    newData.price = Number(newData.price.toFixed(3));
                  }
                  return (
                    <tr key={index} style={{ height: "52px" }}>
                      <td>{meal.name}</td>
                      <td>
                        {data.calories.toFixed(3)} <br />
                        <AiOutlineArrowDown />
                        <br /> {newData.calories.toFixed(3)}
                      </td>
                      <td
                        style={{
                          color:
                            selectedIngredient &&
                            editData.protein !== selectedIngredient.protein
                              ? theme.palette.primary.main
                              : "inherit",
                        }}
                      >
                        {data.protein.toFixed(3)} <br />
                        <AiOutlineArrowDown />
                        <br /> {newData.protein.toFixed(3)}
                      </td>
                      <td
                        style={{
                          color:
                            selectedIngredient &&
                            editData.carbs !== selectedIngredient.carbs
                              ? theme.palette.primary.main
                              : "inherit",
                        }}
                      >
                        {data.carbs.toFixed(3)} <br />
                        <AiOutlineArrowDown />
                        <br /> {newData.carbs.toFixed(3)}
                      </td>
                      <td
                        style={{
                          color:
                            selectedIngredient &&
                            editData.fats !== selectedIngredient.fats
                              ? theme.palette.primary.main
                              : "inherit",
                        }}
                      >
                        {data.fats.toFixed(3)} <br />
                        <AiOutlineArrowDown />
                        <br /> {newData.fats.toFixed(3)}
                      </td>
                      <td>{meal.unit}</td>
                      <td
                        style={{
                          color:
                            selectedIngredient &&
                            editData.price !== selectedIngredient.price
                              ? theme.palette.primary.main
                              : "inherit",
                        }}
                      >
                        {data.price.toFixed(3)} <br />
                        <AiOutlineArrowDown />
                        <br /> {newData.price.toFixed(3)}
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
    </>
  );
};

export default DialogMealTable;
