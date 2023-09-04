import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import useIngredientStore from '../../stores/ingredientStore';

const IngredientBarChart: React.FC = () => {

  const {
    selectedIngredient,
    editData
  } = useIngredientStore()

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        scale: '65%'
      }}
    >
      <BarChart
        colors={[
          '#33FF57', '#2CB37A'
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
        width={400}
        height={280}
        tooltip={{
          trigger: "item"
        }}
      />
    </div>
  )
}

export default IngredientBarChart;