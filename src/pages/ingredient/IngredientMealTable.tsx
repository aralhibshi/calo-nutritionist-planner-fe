import React, { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as MealApi from '../../network/mealApi';
import useIngredientStore from "../../stores/ingredientStore";
import useMealStore from '../../stores/mealStore';
import useSearchStore from "../../stores/searchStore";
import { IComponentIngredient, IComponentIngredientDetails, IMeal, IMealComponent } from '../../interfaces';

const IngredientMealTable: React.FC = () => {
  const {
    loading,
    setLoading
  } = useSearchStore()
  const {
    selectedIngredient,
    editData
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
                const data: IComponentIngredientDetails = {
                  ingredient_id: '',
                  calories: 0,
                  protein: 0,
                  carbs: 0,
                  fats: 0,
                  price: 0,
                  quantity: 0
                }

              if (meal.meals_components && Array.isArray(meal.meals_components) && meal.meals_components.length > 0) {
                meal.meals_components?.map((el: IMealComponent) => {
                  const quantity = Number(el.component_quantity)

                  el.component.components_ingredients?.map(
                    (el: IComponentIngredient) => {

                    if (selectedIngredient && el.ingredient_id !== selectedIngredient.id) {
                      data.ingredient_id = el.ingredient_id;
                      data.protein += Number(el.ingredient.protein * quantity);
                      data.carbs += Number(el.ingredient.carbs * quantity);
                      data.fats += Number(el.ingredient.fats * quantity);
                      data.price += Number(el.ingredient.price * quantity);
                      data.calories += data.protein * 4 + data.carbs * 4 + data.fats * 9;
                    } else {
                      data.protein += Number(editData.protein * quantity);
                      data.carbs += Number(editData.carbs * quantity);
                      data.fats += Number(editData.fats * quantity);
                      data.price += Number(editData.price * quantity);
                      data.calories += data.protein * 4 + data.carbs * 4 + data.fats * 9;
                    }
                    });
                  })
                }
                return (
                  <tr key={index} style={{height:"52px"}}>
                    <td>{meal.name}</td>
                    <td>{(data.calories).toFixed(3)}</td>
                    <td>{(data.protein).toFixed(3)}</td>
                    <td>{(data.carbs).toFixed(3)}</td>
                    <td>{(data.fats).toFixed(3)}</td>
                    <td>{meal.unit}</td>
                    <td>{(data.price).toFixed(3)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                >
                  No meals found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default IngredientMealTable