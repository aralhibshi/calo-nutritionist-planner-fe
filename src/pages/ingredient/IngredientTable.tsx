import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import AddIngredientDialog from './AddIngredientDialog';
import * as IngredientsApi from '../../network/ingredientApi';
import { ICreateIngredientInput } from '../../interfaces/ingredient';
import IngredientDetailModal from './IngredientDetailModal';
import  useSelectedIngredientStore  from './selectedIngredientStore';

const IngredientTable: React.FC = () => {

  const [ingredients, setIngredients] = useState<ICreateIngredientInput[]>([]);
  const { selectedIngredient, setSelectedIngredient } = useSelectedIngredientStore();
  const [open, setOpen] = useState(false);

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

  const handleIngredientAdded = (newIngredient: ICreateIngredientInput) => {
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  const handleRowClick = (row: any) => {
    setSelectedIngredient(row);
    setOpen(true);

    setTimeout(() => {
      resizePieChart();
    }, 1);

    console.log(row);
  };
  const handleSaveIngredient = (updatedIngredient: ICreateIngredientInput) => {
    // Perform the logic to fetch all the ingredients again
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
  };


  const resizePieChart = () => {
    const svgElement = document.querySelector('.css-18ftw0b-MuiChartsSurface-root');

    if (svgElement) {
      svgElement.setAttribute('viewBox', '40 45 330 220');
    }
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Table hoverRow sx={{ marginTop: "40px", userSelect: 'none' }}>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Ingredient</th>
            <th>Calories&nbsp;</th>
            <th>Protein&nbsp;</th>
            <th>Carbs&nbsp;</th>
            <th>Fat&nbsp;</th>
            <th>Unit&nbsp;</th>
            <th>Price&nbsp;(BHD)</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => {
            const calories: number =
              ingredient.fats * 9 + ingredient.carbs * 4 + ingredient.protein * 4;
            return (
              <tr key={ingredient.id} onClick={() => handleRowClick(ingredient)} style={{cursor: 'pointer'}}>
                <td>{ingredient.name}</td>
                <td>{calories}</td>
                <td>{ingredient.protein}</td>
                <td>{ingredient.carbs}</td>
                <td>{ingredient.fats}</td>
                <td>{ingredient.unit}</td>
                <td>{ingredient.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <IngredientDetailModal open={open} handleClose={handleCloseModal} onSave={handleSaveIngredient}ingredient={selectedIngredient} />
      <AddIngredientDialog onIngredientAdded={handleIngredientAdded} />
    </>
  );
}

export default IngredientTable;