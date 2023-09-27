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
import {AiOutlineArrowDown} from 'react-icons/ai'

const DialogMealTable: React.FC = () => {
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalProteins, setTotalProteins] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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

  useEffect(() => {
    let calculatedTotalCalories = 0;
    let calculatedTotalCarbs = 0;
    let calculatedTotalProteins = 0;
    let calculatedTotalFats = 0;
    let calculatedTotalPrice = 0;

    if (
      ingredientMeals &&
      Array.isArray(ingredientMeals) &&
      ingredientMeals.length > 0
    ) {
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
        if (
          meal.meals_components &&
          Array.isArray(meal.meals_components) &&
          meal.meals_components.length > 0
        ) {
          meal.meals_components?.map((el: IMealComponent) => {
            const quantity = Number(el.component_quantity);

            el.component.components_ingredients?.map(
              (el: IComponentIngredient) => {
                if (
                  selectedIngredient &&
                  el.ingredient_id !== selectedIngredient.id
                ) {
                  data.ingredient_id = el.ingredient_id;
                  data.protein += Number(el.ingredient.protein * quantity);
                  data.carbs += Number(el.ingredient.carbs * quantity);
                  data.fats += Number(el.ingredient.fats * quantity);
                  data.price += Number(el.ingredient.price * quantity);
                  data.calories +=
                    data.protein * 4 + data.carbs * 4 + data.fats * 9;
                }
                calculatedTotalCalories += data.calories;
                calculatedTotalCarbs += data.carbs;
                calculatedTotalProteins += data.protein;
                calculatedTotalFats += data.fats;
                calculatedTotalPrice += data.price;
              }
            );
          });
        }
      });
    }
    setTotalCalories(calculatedTotalCalories);
    setTotalCarbs(calculatedTotalCarbs);
    setTotalProteins(calculatedTotalProteins);
    setTotalFats(calculatedTotalFats);
    setTotalPrice(calculatedTotalPrice);
  }, [ingredientMeals, selectedIngredient]);

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
        <Table
          sx={{
            margin: "0 0 0 20px",
            userSelect: "none",
            width: "740px",
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

                if (
                  meal.meals_components &&
                  Array.isArray(meal.meals_components) &&
                  meal.meals_components.length > 0
                ) {
                  meal.meals_components?.map((el: IMealComponent) => {
                    const quantity = Number(el.component_quantity);

                    el.component.components_ingredients?.map(
                      (el: IComponentIngredient) => {
                        if (
                          selectedIngredient &&
                          el.ingredient_id !== selectedIngredient.id
                        ) {
                          data.ingredient_id = el.ingredient_id;
                          data.protein += Number(
                            el.ingredient.protein * quantity
                          );
                          data.carbs += Number(el.ingredient.carbs * quantity);
                          data.fats += Number(el.ingredient.fats * quantity);
                          data.price += Number(el.ingredient.price * quantity);
                          data.calories +=
                            data.protein * 4 + data.carbs * 4 + data.fats * 9;
                        }
                      }
                    );
                  });
                }
                return (
                  <tr key={index} style={{ height: "52px" }}>
                    <td>{meal.name}</td>
                    <td>{totalCalories} <br/><AiOutlineArrowDown/><br/> {data.calories.toFixed(3)}</td>
                    <td
                      style={{
                        color:
                          selectedIngredient &&
                          editData.protein !== selectedIngredient.protein
                            ? theme.palette.primary.main
                            : "inherit",
                      }}
                    >
                      {totalProteins} <br/><AiOutlineArrowDown/><br/> {data.protein.toFixed(3)}
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
                      {totalCarbs} <br/><AiOutlineArrowDown/><br/> {data.carbs.toFixed(3)}
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
                      {totalFats} <br/><AiOutlineArrowDown/><br/> {data.fats.toFixed(3)}
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
                      {totalPrice} <br/><AiOutlineArrowDown/><br/> {data.price.toFixed(3)}
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
      </TableContainer>
    </>
  );
};

export default DialogMealTable;
