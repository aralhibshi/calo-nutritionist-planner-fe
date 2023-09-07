import React, { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as MealApi from '../../network/mealApi';
import useIngredientStore from "../../stores/ingredientStore";
import useMealStore from '../../stores/mealStore';
import useSearchStore from "../../stores/searchStore";
import { IComponentIngredient, IMeal, IMealComponent } from '../../interfaces';

const IngredientMealTable: React.FC = () => {
  const {
    loading,
    setLoading
  } = useSearchStore()
  const {
    selectedIngredient,
  } = useIngredientStore();
  const {
    ingredientMeals,
    setIngredientMeals
  } = useMealStore();

  async function loadMeals() {
    try {
      setLoading(true);
      if (selectedIngredient) {
        const data = {
          skip: 0,
          take: 200,
          ingredient_id: selectedIngredient.id
        }
        const response = await MealApi.fetchMeals(data);
        console.log(response);
        setIngredientMeals(response.data.meals)
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
          <CircularProgress
            color="inherit"
          />
        </Backdrop>
      )}
      <TableContainer
      sx={{
        maxHeight: 305
      }}
      >
        <Table
          sx={{
            margin: '0 0 0 20px',
            userSelect: "none",
            width: '740px'
          }}
          id='table'
        >
          <thead>
            <tr>
              <th>
                Meal Name&nbsp;
              </th>
              <th>Calories&nbsp;</th>
              <th>Protein&nbsp;</th>
              <th>Carbs&nbsp;</th>
              <th>Fat&nbsp;</th>
              <th>Unit&nbsp;</th>
              <th>Price&nbsp;</th>
            </tr>
          </thead>
          <tbody>
          {ingredientMeals && Array.isArray(ingredientMeals) && ingredientMeals.length > 0 ? (
            ingredientMeals.map((meal: IMeal, index: number) => {
              let totalFats = 0;
              let totalCarbs = 0;
              let totalProteins = 0;
              let totalCalories = 0;
              let totalPrice = 0;

              if (
                meal.meals_components &&
                Array.isArray(meal.meals_components) &&
                meal.meals_components.length > 0
              ) {
              meal.meals_components?.map((el: IMealComponent) => {
                const quantity = Number(el.component_quantity)

                el.component.components_ingredients?.map(
                  (el: IComponentIngredient) => {
                    totalFats += Number(el.ingredient.fats*quantity);
                    totalCarbs += Number(el.ingredient.carbs*quantity);
                    totalProteins += Number(el.ingredient.protein*quantity);
                    totalPrice += Number(el.ingredient.price*quantity);
                    totalCalories += totalFats * 9 + totalCarbs * 4 + totalProteins * 4;
                  });
                })
              }
              return (
                <tr key={index} style={{height:"52px"}}>
                  <td>{meal.name}</td>
                  <td>{(totalCalories).toFixed(3)}</td>
                  <td>{(totalProteins).toFixed(3)}</td>
                  <td>{(totalCarbs).toFixed(3)}</td>
                  <td>{(totalFats).toFixed(3)}</td>
                  <td>{meal.unit}</td>
                  <td>{(totalPrice).toFixed(3)}</td>
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
  )
}

export default IngredientMealTable