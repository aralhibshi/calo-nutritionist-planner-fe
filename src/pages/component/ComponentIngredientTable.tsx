import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as IngredientsApi from "../../network/ingredientApi";
import useIngredientStore from "../../stores/ingredientStore";
import useSearchStore from "../../stores/searchStore";
import { IComponentIngredient, IIngredient } from "../../interfaces";
import useEntityStore from "../../stores/entityStore";

interface ComponentIngredientTableProps {}

const ComponentIngredientTable: React.FC<
  ComponentIngredientTableProps
> = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [quantity, setQuantity] = useState(1);
  const {
    componentLoading,
    setComponentLoading,
    componentSearchResult,
    setComponentSearchResult,
  } = useSearchStore();
  const { setEntityCount, skip } = useEntityStore();
  const { selectedIngredients, setSelectedIngredients } = useIngredientStore();

  async function loadIngredients() {
    try {
      setComponentLoading(true);
      const take = 100;
      const response = await IngredientsApi.fetchIngredients(0, take);
      setEntityCount(response.count);
      setComponentSearchResult(response.data);
      if (componentSearchResult) {
        setIngredients(componentSearchResult);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setComponentLoading(false);
    }
  }

  useEffect(() => {
    loadIngredients();
  }, [skip]);

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ingredientId: string
  ) => {
    const updatedSelectedIngredients: any = [...selectedIngredients];
    const ingredientIndex = updatedSelectedIngredients.findIndex(
      (ingredient: any) => ingredient.ingredient_id === ingredientId
    );

    const newQuantity = parseInt(e.target.value, 10); // Get the new quantity from the input

    if (ingredientIndex !== -1) {
      if (newQuantity > 0) {
        // Update the ingredient quantity if it exists in the selectedIngredients array
        updatedSelectedIngredients[ingredientIndex].ingredient_quantity =
          newQuantity;
      } else {
        // Remove the ingredient if the quantity is set to 0 or less
        updatedSelectedIngredients.splice(ingredientIndex, 1);
      }
    } else if (newQuantity > 0) {
      // Add the ingredient to selectedIngredients if it doesn't exist and the quantity is greater than 0
      updatedSelectedIngredients.push({
        ingredient_id: ingredientId,
        ingredient_quantity: newQuantity,
      });
    }

    setSelectedIngredients(updatedSelectedIngredients);
    console.log("selected ingredients", updatedSelectedIngredients);
  };
  const handleSelectClick = (row: any) => {
    const updatedSelectedIngredients: any = [...selectedIngredients];
    const ingredientIndex = updatedSelectedIngredients.findIndex(
      (ingredient: any) => ingredient.ingredient_id === row.id
    );

    if (ingredientIndex !== -1) {
      updatedSelectedIngredients.splice(ingredientIndex, 1);
    } else {
      // Check if the quantity is greater than 0 before adding the ingredient
      if (quantity > 0) {
        updatedSelectedIngredients.push({
          ingredient_id: row.id,
          ingredient_quantity: quantity,
        });
      }
    }

    setSelectedIngredients(updatedSelectedIngredients);
    console.log("selected ingredients", updatedSelectedIngredients);
  };

  return (
    <>
      {componentLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div
        style={{
          marginTop: "12px",
          overflowY: "auto",
          maxHeight: "400px",
          width: "100%",
        }}
      >
        <TableContainer>
          <Table
            stickyHeader
            sx={{
              userSelect: "none",
              width: "100%",
            }}
            id="table"
          >
            <thead>
              <tr>
                <th>Ingredient Name&nbsp;</th>
                <th>Quantity</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {componentSearchResult &&
              Array.isArray(componentSearchResult) &&
              componentSearchResult.length > 0 ? (
                componentSearchResult.map(
                  (ingredient: IIngredient, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{ingredient.name}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value, 10))
                            }
                            style={{ width: "50px" }} // Adjust the width here
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() => handleSelectClick(ingredient)}
                          />
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan={8}>No search results found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ComponentIngredientTable;
