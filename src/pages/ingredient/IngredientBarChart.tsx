import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import useIngredientStore from '../../stores/ingredientStore';

const IngredientBarChart: React.FC = () => {

  const {
    selectedIngredient,
    editData
  } = useIngredientStore()

  return (
    <BarChart
      sx={{
        scale: '100%',
        translate: '0 -10px',
      }}
      colors={[
        '#234935', '#57AE7F'
      ]}
      xAxis={[{
          scaleType: 'band',
          data: [
          'Price',
          'Protein',
          'Carbs',
          'Fats'
        ]
      }]}
      series={[
        {
          data: [
            selectedIngredient ? Number(selectedIngredient?.price): 0,
            selectedIngredient ? Number(selectedIngredient?.protein): 0,
            selectedIngredient ? Number(selectedIngredient.carbs): 0,
            selectedIngredient ? Number(selectedIngredient.fats): 0
          ],
          highlightScope: {
            faded: "global",
            highlighted: "item"
          },
          label: 'Current'
        },
        {
          data: [
            Number(editData.price),
            Number(editData.protein),
            Number(editData.carbs),
            Number(editData.fats)
          ],
          highlightScope: {
            faded: "global",
            highlighted: "item"
          },
          label: 'Edit'
        }
      ]}
      width={480}
      height={220}
      tooltip={{
        trigger: "item"
      }}
    />
  )
}

export default IngredientBarChart;