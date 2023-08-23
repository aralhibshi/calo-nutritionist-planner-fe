import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Button from '@mui/material/Button';
import AddIngredientDialog from './AddIngredientDialog';
import * as IngredientsApi from '../../network/ingredient_api';
import { IIngredient } from '../../interfaces/ingredient';

export default function TableHover() {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);

  useEffect(() => {
    async function loadIngredients() {
      try {
        const ingredients = await IngredientsApi.fetchIngredients();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadIngredients();
  }, []);

  const handleIngredientAdded = (newIngredient: IIngredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  return (
    <>
      <Table hoverRow sx={{ marginTop: "40px" }}>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Ingredient</th>
            <th>Fat&nbsp;(g)</th>
            <th>Carbs&nbsp;(g)</th>
            <th>Protein&nbsp;(g)</th>
            <th>Calories&nbsp;(g)</th>
            <th>Price&nbsp;(BHD)</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => {
            // console.log("fats" + ingredient.fats);
            // console.log("carbs" + ingredient.carbs);
            // console.log("protein" + ingredient.protein); // Add this line
            const calories: number =
              ingredient.fats * 9 +
              ingredient.carbs * 4 +
              ingredient.protein * 4;
            // console.log(calories); // Add this line
            return (
              <tr key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td>{ingredient.fats}</td>
                <td>{ingredient.carbs}</td>
                <td>{ingredient.protein}</td>
                <td>{calories}</td>
                <td>{ingredient.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddIngredientDialog onIngredientAdded={handleIngredientAdded} />
    </>
  );
}