import React, { useEffect, useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop, IconButton } from '@mui/material';
import EditIngredientDialog from './EditIngredientDialog';
import CreateIngredientDialog from './CreateIngredientDialog';
import * as IngredientApi from '../../network/ingredientApi';
import useIngredientStore from '../../stores/ingredientStore';
import useSearchStore from '../../stores/searchStore';
import { IIngredient, IIngredientData } from '../../interfaces';
import EditIcon from '@mui/icons-material/Edit';
import ScienceIcon from '@mui/icons-material/Science';
import useEntityStore from '../../stores/entityStore';
import useTableStore from '../../stores/tableStore';
import IngredientPlaygroundDialog from './IngredientPlaygroundDialog';
import Tooltip from '@mui/material/Tooltip';

const IngredientTable: React.FC = () => {
  const [ingredients, setIngredients] = useState<IIngredientData[]>([]);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    setEntityCount,
    skip,
    take,
    setTake,
    setTakeCondition,
    loading,
    setLoading,
    result,
    setResult
  } = useEntityStore();
  const {
    selectedIngredient,
    setSelectedIngredient,
    editData,
    setEditData
  } = useIngredientStore();
  const {
    setSearchResult
  } = useSearchStore()
  const {
    height,
    setHeight,
    setHeightCondition
  } = useTableStore()

  // Memo
  const memoizedResult = useMemo(() => result, [result]);

  async function loadIngredients() {
    try {
      console.log(window.innerHeight);
      setTakeCondition(setTake);
      setHeightCondition(setHeight);
      setSearchResult(false);
      setLoading(true);

      const data = {
        skip: skip,
        take: take
      }
      const response = await IngredientApi.fetchIngredients(data);
      setEntityCount(response.data.count);
      setResult(response.data.ingredients)
      if (result) {
        setIngredients(result);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        console.log(height)
      }, 100)
    }
  }

  useEffect(() => {
    loadIngredients();
  }, [take, skip]);

  // Shared Functions
  function calculateData(useCase: string, data: any) {
    const calculatedCalories =
      Number(data.protein) * 4 +
      Number(data.carbs) * 4 +
      Number(data.fats) * 9;

  
    data.calories = Number(calculatedCalories.toFixed(3));

    if (useCase === 'useEffect') {
      const array = [
        'price',
        'protein',
        'carbs',
        'fats'
      ]

      array.forEach(el => {
        data[el] = Number(Number(data[el]).toFixed(3))
      })
    }
  
    if (data.calories > 6.999) {
      data.rating = 'High';
    }
    if (data.calories > 2.500 && data.calories < 6.999) {
      data.rating = 'Normal'
    }
    if (data.calories < 2.500) {
      data.rating = 'Low';
    }

    data.totalUnit =
      Number(
        (
          Number(data.protein) +
          Number(data.carbs) +
          Number(data.fats)
        )
          .toFixed(3));

    data.unitType = 'Total ' + data.unit

    setEditData(data);
  }

  function formattedCalories() {
    if (editData.calories <= 10.000) {
      return editData.calories * 10
    } else {
      return 100
    }
  }

  function progressColor() {
    if (editData.rating === 'High') {
      return 'error'
    }
    if (editData.rating === 'Normal') {
      return 'primary'
    }
    if (editData.rating === 'Low') {
      return 'warning'
    }
  }

  function sliderColor() {
    if (editData.totalUnit) {
      if (editData.totalUnit === 1.000) {
        return 'primary'
      } else if (editData.totalUnit < 1.000){
        return '#ED6C02'
      } else {
        return '#D3302F'
      }
    }
  }

  // Handlers
  const handleIngredientAdded = (newIngredient: any) => {
    setIngredients((prevIngredients: any) => [
      ...prevIngredients,
      newIngredient,
    ]);
  };

  const handleIngredientClick = (row: any) => {
    setSelectedIngredient(row);
    setTimeout(() => {
      setPlaygroundOpen(true);
    }, 0);
    setTimeout(() => {
      const barChart = document.querySelector('.css-18ftw0b-MuiChartsSurface-root')
      barChart?.setAttribute('viewBox', '0 15 400 280');
    }, 20)
  };

  const handleIngredientUpdated = (updatedIngredient: IIngredientData) => {
    const updatedIndex = ingredients.findIndex(
      (ingredient) => ingredient.id === updatedIngredient.id
    );
  
    if (updatedIndex !== -1) {
      const updatedIngredients = [...ingredients];
      updatedIngredients[updatedIndex] = updatedIngredient;
      setIngredients(updatedIngredients);
    }
  
    setOpen(false);
    loadIngredients();
  };

  const handleEditClick = (row: any) => {
    setSelectedIngredient(row);
    setTimeout(() => {
      setOpen(true);
    }, 0);
    setTimeout(() => {
      const barChart = document.querySelector('.css-18ftw0b-MuiChartsSurface-root')
      barChart?.setAttribute('viewBox', '0 15 400 280');
    }, 20)
  };

  return (
    <>
      {loading && (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress
            color='inherit'
          />
        </Backdrop>
      )}
      <Table
        sx={{
          marginTop: '15px',
          marginBottom: '15px',
          userSelect: 'none',
        }}
        id='table'
      >
        <thead>
          <tr>
            <th>
              Ingredient Name&nbsp;
            </th>
            <th>Calories&nbsp;</th>
            <th>Protein&nbsp;</th>
            <th>Carbs&nbsp;</th>
            <th>Fat&nbsp;</th>
            <th>Unit&nbsp;</th>
            <th>Price&nbsp;</th>
            <th>Actions&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {memoizedResult && Array.isArray(memoizedResult) && memoizedResult.length > 0 ? (
            memoizedResult.map((ingredient: IIngredient, index: number) => {
            const calories: string = (
              ingredient.fats * 9 +
              ingredient.carbs * 4 +
              ingredient.protein * 4
            )
              .toFixed(3)
              .padEnd(5, '0');
            return (
              <tr
                id='table'
                key={index} style={{height:'52px'}}
              >
                <td
                  style={{
                    width: '40%',
                  }}
                >
                  {ingredient.name} 
                </td>
                <td>{calories}</td>
                <td>{ingredient.protein}</td>
                <td>{ingredient.carbs}</td>
                <td>{ingredient.fats}</td>
                <td>{ingredient.unit}</td>
                <td>{ingredient.price}</td>
                <td>
                  <Tooltip
                    title='Playground'
                    followCursor
                  >
                    <IconButton
                      onClick={() => handleIngredientClick(ingredient)}
                      color='success'
                    >
                      <ScienceIcon
                        color='primary'
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title='Edit'
                    followCursor
                  >
                    <IconButton
                      onClick={() => handleEditClick(ingredient)}
                      color='success'
                    >
                      <EditIcon
                        color='primary'
                      />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          })
          ) : (
            <tr>
              <td colSpan={8}>No search results found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <EditIngredientDialog
        key={selectedIngredient?.id}
        open={open}
        setOpen={setOpen}
        onIngredientUpdated={handleIngredientUpdated}
        calculateData={calculateData}
        formattedCalories={formattedCalories}
        progressColor={progressColor}
        sliderColor={sliderColor}
      />
      <IngredientPlaygroundDialog
        open={playgroundOpen}
        setOpen={setPlaygroundOpen}
        calculateData={calculateData}
        formattedCalories={formattedCalories}
        progressColor={progressColor}
        sliderColor={sliderColor}
      />
      <CreateIngredientDialog
        onIngredientAdded={handleIngredientAdded}
      />
    </>
  );
};

export default IngredientTable;