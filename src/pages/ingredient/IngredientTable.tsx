import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, IconButton } from "@mui/material";
import EditIngredientDialog from "./EditIngredientDialog";
import AddIngredientDialog from "./AddIngredientDialog";
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
    loading,
    setLoading,
    searchResult,
    setSearchResult
  } = useSearchStore();
  const {
    setEntityCount,
    skip,
    setSkip
  } = useEntityStore();
  const {
    selectedIngredient,
    setSelectedIngredient
  } = useIngredientStore();

  async function loadIngredients() {
    try {
      setLoading(true);
      setSkip(0)
      const response = await IngredientsApi.fetchIngredients(skip);
      setEntityCount(response.count);
      setSearchResult(response.data)
      if (searchResult) {
        setIngredients(searchResult);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIngredients();
  }, [skip]);

  const handleIngredientAdded = (newIngredient: any) => {
    setIngredients((prevIngredients: any) => [
      ...prevIngredients,
      newIngredient,
    ]);
  };

  const handleEditClick = (row: any) => {
    setSelectedIngredient(row);
    setTimeout(() => {
      setOpen(true);
    }, 0);
    console.log(row);
    console.log("Dialog should open now.");
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

  function isIngredient(obj: any): obj is IIngredient {
    return (
      typeof obj === 'object' &&
      'fats' in obj &&
      'carbs' in obj &&
      'protein' in obj
    );
  }

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
      <Table
        hoverRow
        sx={{
          marginTop: "20px",
          userSelect: "none",
          fontFamily: 'Roboto'
        }}
        id='table'
      >
        <thead>
          <tr
          >
            <th style={{ width: "40%" }}>Ingredient Name&nbsp;</th>
            <th>Calories&nbsp;</th>
            <th>Protein&nbsp;</th>
            <th>Carbs&nbsp;</th>
            <th>Fat&nbsp;</th>
            <th>Unit&nbsp;</th>
            <th>Price&nbsp;(BHD)</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        {searchResult && Array.isArray(searchResult) ? (
          searchResult.map((ingredient: IIngredient, index: number) => {
            const calories: string = (
              ingredient.fats * 9 +
              ingredient.carbs * 4 +
              ingredient.protein * 4
            )
              .toFixed(3)
              .padEnd(5, "0");
            return (
              <tr
                id='table'
                key={index}
              >
                <td>{ingredient.name}</td>
                <td>{calories}</td>
                <td>{ingredient.protein}</td>
                <td>{ingredient.carbs}</td>
                <td>{ingredient.fats}</td>
                <td>{ingredient.unit}</td>
                <td>{ingredient.price}</td>
                <td>
                  <IconButton onClick={() => handleEditClick(ingredient)}>
                    <EditIcon />
                  </IconButton>
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
        ingredient={selectedIngredient}
      />
      <AddIngredientDialog
        onIngredientAdded={handleIngredientAdded}
      />
    </>
  );
};

export default IngredientTable;
