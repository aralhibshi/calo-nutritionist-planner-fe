import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as IngredientsApi from "../../network/ingredientApi";
import useIngredientStore from "../../stores/ingredientStore";
import useSearchStore from "../../stores/searchStore";
import { IIngredient } from "../../interfaces";
import useEntityStore from "../../stores/entityStore";
import { Input } from "@mui/material";
import { Checkbox } from "@mui/material";

interface ComponentIngredientTableProps {}

const ComponentIngredientTable: React.FC<
  ComponentIngredientTableProps
> = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [quantities, setQuantities] = useState<{
    [ingredientId: string]: number;
  }>({});
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
      // setEntityCount(response.data.count);
      setComponentSearchResult(response.data.ingredients);
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
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    ingredientId: string
  ) => {
    const newQuantity = parseInt(e.currentTarget.value, 10);

    const quantity = isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity;

    setQuantities({
      ...quantities,
      [ingredientId]: quantity,
    });
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
      if (quantities[row.id] > 0) {
        updatedSelectedIngredients.push({
          ingredient_id: row.id,
          ingredient_quantity: quantities[row.id],
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
          maxHeight: "300px",
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
                <th>Quantity&nbsp;(in grams)</th>
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
                          <Input
                            type="number"
                            inputProps={{
                              min: 1,
                              value: quantities[ingredient.id] || 1, // Set the default value to 1
                              onChange: (e) =>
                                handleQuantityChange(e, ingredient.id),
                            }}
                            sx={{ width: "50px" }}
                          />
                        </td>
                        <td>
                          <Input
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
