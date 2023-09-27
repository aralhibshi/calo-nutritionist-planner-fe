import React, { useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import * as ComponentApi from '../../network/componentApi'
import useEntityStore from '../../stores/entityStore';
import useIngredientStore from '../../stores/ingredientStore';
import useComponentStore from '../../stores/componentStore';
import { IComponent , IComponentIngredientDetails } from '../../interfaces';
import { useTheme } from '@mui/material/styles';
import useSearchStore from '../../stores/searchStore';

const IngredientComponentTable: React.FC = () => {
  const {
    loading,
    setLoading,
  } = useEntityStore();
  const {
    selectedIngredient,
    editData
  } = useIngredientStore();
  const {
    ingredientComponents,
    setIngredientComponents,
  } = useComponentStore();
  const {
    setSearchResult
  } = useSearchStore();

  const theme = useTheme();

  async function loadComponents() {
    try {
      setSearchResult(false);
      setLoading(true);
      if (selectedIngredient) {
        const data = {
          skip: 0,
          take: 200,
          ingredient_id: selectedIngredient.id
        }
        const response = await ComponentApi.fetchComponents(data);
        setIngredientComponents(response.data.components)
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComponents();
  }, []);

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
      <TableContainer
      sx={{
        maxHeight: 305,
        overflowX: 'hidden'
      }}
      >
        <Table
          sx={{
            margin: '0 0 0 20px',
            userSelect: 'none',
            width: '740px'
          }}
          id='table'
        >
          <thead
            style={{
              position: 'sticky',
              top: 0,
              background: 'white',
            }}
          >
            <tr>
              <th>
                Component Name&nbsp;
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
          {ingredientComponents &&
              Array.isArray(ingredientComponents) &&
              ingredientComponents.length > 0 ? (
                ingredientComponents.map(
                  (component: IComponent, index: number) => {
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
                      component.components_ingredients &&
                      Array.isArray(component.components_ingredients)
                    ) {
                      component.components_ingredients.forEach((el) => {
                        newData.quantity += Number(el.ingredient_quantity);
                        if (
                          selectedIngredient &&
                          el.ingredient_id !== selectedIngredient.id
                        ) {
                          newData.protein += Number(el.ingredient.protein);
                          newData.carbs += Number(el.ingredient.carbs);
                          newData.fats += Number(el.ingredient.fats);
                          newData.price += Number(el.ingredient.price);
                        }
                      });
                      newData.calories = Number(
                        newData.protein * 4 + newData.carbs * 4 + newData.fats * 9
                      );
                      newData.protein = Number((newData.protein.toFixed(3)));
                      newData.carbs = Number(newData.carbs.toFixed(3));
                      newData.fats = Number(newData.fats.toFixed(3));
                      newData.calories = Number(newData.calories.toFixed(3));
                      newData.price = Number(newData.price.toFixed(3));
                    }
                return (
                  <tr key={index} style={{height:'52px'}}>
                    <td>{component.name}</td>
                    <td
                      // style={{
                      //   color: selectedIngredient && editData.calories !== 
                      //     ? theme.palette.primary.main
                      //     : 'inherit',
                      // }}
                    >
                      {Number((newData.calories / newData.quantity).toFixed(3))}
                    </td>
                    <td
                      style={{
                        color: selectedIngredient && editData.protein !== selectedIngredient.protein
                          ? theme.palette.primary.main
                          : 'inherit',
                      }}
                    >
                      {Number((newData.protein / newData.quantity).toFixed(3))}
                    </td>
                    <td
                      style={{
                        color: selectedIngredient && editData.carbs !== selectedIngredient.carbs
                          ? theme.palette.primary.main
                          : 'inherit',
                      }}
                    >
                      {Number((newData.carbs / newData.quantity).toFixed(3))}
                    </td>
                    <td
                      style={{
                        color: selectedIngredient && editData.fats !== selectedIngredient.fats
                          ? theme.palette.primary.main
                          : 'inherit',
                      }}
                    >
                      {Number((newData.fats / newData.quantity).toFixed(3))}
                    </td>
                    <td>{component.unit}</td>
                    <td
                      style={{
                        color: selectedIngredient && editData.price !== selectedIngredient.price
                          ? theme.palette.primary.main
                          : 'inherit',
                      }}
                    >
                      {Number((newData.price / newData.quantity).toFixed(3))}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                >
                  No components found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default IngredientComponentTable;