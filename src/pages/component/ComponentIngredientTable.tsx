import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as IngredientsApi from "../../network/ingredientApi";
import useIngredientStore from "../../stores/ingredientStore";
import useSearchStore from "../../stores/searchStore";
import { IIngredient, IIngredientData } from "../../interfaces";
import EditIcon from "@mui/icons-material/Edit";
import useEntityStore from "../../stores/entityStore";

const IngredientTable: React.FC = () => {
  const [ingredients, setIngredients] = useState<IIngredientData[]>([]);
  const [open, setOpen] = useState(false);
  const {
    componentLoading,
    setComponentLoading,
    componentSearchResult,
    setComponentSearchResult
  } = useSearchStore();
  const {
    setEntityCount,
    skip,
  } = useEntityStore();
  const {
    selectedIngredient,
    setSelectedIngredient
  } = useIngredientStore();

  async function loadIngredients() {
    try {
      setComponentLoading(true);
      const take = 9;
      const response = await IngredientsApi.fetchIngredients(0, 100);
      setEntityCount(response.count);
      setComponentSearchResult(response.data)
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
              {/* <th>Calories&nbsp;</th>
              <th>Protein&nbsp;</th>
              <th>Carbs&nbsp;</th>
              <th>Fat&nbsp;</th>
              <th>Unit&nbsp;</th> */}
              <th>Price&nbsp;(BHD)</th>
            </tr>
          </thead>
          <tbody>
            {componentSearchResult &&
            Array.isArray(componentSearchResult) &&
            componentSearchResult.length > 0 ? (
              componentSearchResult.map(
                (ingredient: IIngredient, index: number) => {
                  const calories: string = (
                    ingredient.fats * 9 +
                    ingredient.carbs * 4 +
                    ingredient.protein * 4
                  )
                    .toFixed(3)
                    .padEnd(5, "0");
                  return (
                    <tr key={index}>
                      <td>{ingredient.name}</td>
                      {/* <td>{calories}</td>
                      <td>{ingredient.protein}</td>
                      <td>{ingredient.carbs}</td>
                      <td>{ingredient.fats}</td>
                      <td>{ingredient.unit}</td> */}
                      <td>{ingredient.price}</td>
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

export default IngredientTable;