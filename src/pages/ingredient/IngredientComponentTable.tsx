import React, { useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as ComponentApi from '../../network/componentApi'
import useIngredientStore from "../../stores/ingredientStore";
import useComponentStore from "../../stores/componentStore";
import useSearchStore from "../../stores/searchStore";
import { IComponent } from "../../interfaces";

const IngredientComponentTable: React.FC = () => {
  const {
    loading,
    setLoading,
  } = useSearchStore();
  const {
    selectedIngredient,
  } = useIngredientStore();
  const {
    ingredientComponents,
    setIngredientComponents
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
                let totalFats = 0;
                let totalCarbs = 0;
                let totalProteins = 0;
                let totalCalories = 0;
                let totalPrice = 0;
                if (component.components_ingredients && Array.isArray(component.components_ingredients)) {
                  component.components_ingredients.forEach((el) => {
                    totalFats += Number(el.ingredient.fats*el.ingredient_quantity);
                    totalCarbs += Number(el.ingredient.carbs*el.ingredient_quantity);
                    totalProteins += Number(el.ingredient.protein*el.ingredient_quantity);
                    totalCalories += totalFats * 9 + totalCarbs * 4 + totalProteins * 4;
                    totalPrice += Number(el.ingredient.price* el.ingredient_quantity);
                  });
                  totalFats = Number(totalFats.toFixed(3));
                  totalCarbs = Number(totalCarbs.toFixed(3));
                  totalProteins = Number(totalProteins.toFixed(3));
                  totalCalories = Number(totalCalories.toFixed(3));
                  totalPrice = Number(totalPrice.toFixed(3));
                }
                return (
                  <tr key={index} style={{height:"52px"}}>
                    <td>{component.name}</td>
                    <td>{totalCalories}</td>
                    <td>{totalProteins}</td>
                    <td>{totalCarbs}</td>
                    <td>{totalFats}</td>
                    <td>{component.unit}</td>
                    <td>{totalPrice}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8}>No components found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default IngredientComponentTable;