import React, { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as ComponentApi from '../../network/componentApi'
import useIngredientStore from "../../stores/ingredientStore";
import useComponentStore from "../../stores/componentStore";
import useSearchStore from "../../stores/searchStore";
import { IComponent , IComponentIngredientDetails } from "../../interfaces";

const IngredientComponentTable: React.FC = () => {
  const {
    loading,
    setLoading,
  } = useSearchStore();
  const {
    selectedIngredient,
    editData
  } = useIngredientStore();
  const {
    ingredientComponents,
    setIngredientComponents,
  } = useComponentStore();

  async function loadComponents() {
    try {
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
            {ingredientComponents && Array.isArray(ingredientComponents) && ingredientComponents.length > 0 ? (
              ingredientComponents.map((component: IComponent, index: number) => {
                const data: IComponentIngredientDetails = {
                  calories: 0,
                  protein: 0,
                  carbs: 0,
                  fats: 0,
                  price: 0,
                  quantity: 0
                }

                if (component.components_ingredients && Array.isArray(component.components_ingredients)) {
                  component.components_ingredients.forEach((el) => {

                    if (selectedIngredient && el.ingredient_id !== selectedIngredient.id) {
                      data.protein += Number(el.ingredient.protein)
                      data.carbs += Number(el.ingredient.carbs)
                      data.fats += Number(el.ingredient.fats)
                      data.calories += Number(data.protein * 4 + data.carbs * 4 + data.fats * 9)
                      data.price += Number(el.ingredient.price )
                    } else {
                      data.protein += Number(editData.protein)
                      data.carbs += Number(editData.carbs)
                      data.fats += Number(editData.fats)
                      data.calories += Number(data.protein * 4 + data.carbs * 4 + data.fats * 9)
                      data.price += Number(editData.price)
                      data.quantity += Number(el.ingredient_quantity)
                    }
                  });

                  data.protein = Number(data.protein.toFixed(3));
                  data.carbs = Number(data.carbs .toFixed(3));
                  data.fats = Number(data.fats.toFixed(3));
                  data.calories = Number(data.calories.toFixed(3));
                  data.price = Number(data.price.toFixed(3));
                }
                return (
                  <tr key={index} style={{height:"52px"}}>
                    <td>{component.name}</td>
                    <td>
                      {Number((data.calories / data.quantity).toFixed(3))}
                    </td>
                    <td>
                      {Number((data.protein / data.quantity).toFixed(3))}
                    </td>
                    <td>
                      {Number((data.carbs / data.quantity).toFixed(3))}
                    </td>
                    <td>
                      {Number((data.fats / data.quantity).toFixed(3))}
                    </td>
                    <td>{component.unit}</td>
                    <td>
                      {Number((data.price / data.quantity).toFixed(3))}
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