import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as IngredientsApi from "../../network/ingredientApi";
import useIngredientStore from "../../stores/ingredientStore";
import useSearchStore from "../../stores/searchStore";
import {
  IComponentIngredient,
  IIngredient,
  IComponentIngredientDataArray,
} from "../../interfaces";
import useEntityStore from "../../stores/entityStore";

interface ComponentIngredientTableProps {}

const ComponentIngredientTable: React.FC<
  ComponentIngredientTableProps
> = () => {
  const [ingredients, setIngredients] = useState<IComponentIngredient[]>([]);
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
      const take = 9;
      const response = await IngredientsApi.fetchIngredients(0, 100);
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

  // const handleQuantityChange = (
  //   ingredient: IComponentIngredient,
  //   quantity: number
  // ) => {
  //   const updatedIngredient: IComponentIngredient = {
  //     ...ingredient,
  //     ingredient_quantity: quantity,
  //   };

  //   const updatedIngredients = [...selectedIngredients];
  //   const existingIndex = updatedIngredients.findIndex(
  //     (item) => item.id === updatedIngredient.id
  //   );
  //   if (existingIndex !== -1) {
  //     updatedIngredients[existingIndex] = updatedIngredient;
  //   } else {
  //     updatedIngredients.push(updatedIngredient);
  //   }

  //   setSelectedIngredients(updatedIngredients);
  // };

  const handleSelectClick = (row: IComponentIngredient) => {
    const updatedSelectedIngredients = [...selectedIngredients];
    const ingredientIndex = updatedSelectedIngredients.findIndex(
      (ingredient) => ingredient.id === row.id
    );

    if (ingredientIndex !== -1) {
      updatedSelectedIngredients.splice(ingredientIndex, 1);
    } else {
      updatedSelectedIngredients.push(row);
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
      <div style={{ overflowY: "auto", maxHeight: "400px" }}>
        <Table
          hoverRow
          sx={{
            marginTop: "15px",
            userSelect: "none",
          }}
          id="table"
        >
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Ingredient Name&nbsp;</th>
              {/* <th>&nbsp;&nbsp;&nbsp;&nbsp;quantity</th> */}
              <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select</th>
            </tr>
          </thead>
          <tbody>
            {componentSearchResult &&
            Array.isArray(componentSearchResult) &&
            componentSearchResult.length > 0 ? (
              componentSearchResult.map(
                (ingredient: IComponentIngredient, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{ingredient.name}</td>
                      {/* <td>
                        <input
                          type="number"
                          min="0"
                          value={
                            selectedIngredients.find(
                              (item) => item.id === ingredient.id
                            )?.ingredient_quantity || ""
                          }
                          onChange={(e) =>
                            handleQuantityChange(
                              ingredient,
                              parseInt(e.target.value, 10)
                            )
                          }
                          style={{ width: "50px" }} // Adjust the width here
                        />
                      </td> */}
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
      </div>
    </>
  );
};

export default ComponentIngredientTable;
