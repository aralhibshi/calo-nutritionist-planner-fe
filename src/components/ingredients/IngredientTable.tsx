import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import * as IngredientsApi from  '../../network/ingredient_api';
import {Ingredient as IngredientModel} from '../../models/ingredient'

export default function TableHover() {

  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);

  useEffect(() => {
    async function loadIngredients() {
      try {
        const ingredients = await IngredientsApi.fetchIngredients();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error)
        alert(error);
      }
      
    }
    loadIngredients();
  }, [])

  return (
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
          const calories: number =
            ingredient.fats * 9 + ingredient.carbs * 4 + ingredient.protein * 4;
          return (
            <tr key={ingredient.name}>
              <td>{ingredient.name}</td>
              <td>{ingredient.fats}</td>
              <td>{ingredient.carbs}</td>
              <td>{ingredient.protein}</td>
              <td>{ingredient.price}</td>
              <td>{calories}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}