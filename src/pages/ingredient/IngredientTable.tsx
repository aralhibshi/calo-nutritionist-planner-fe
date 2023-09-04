import React, { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, IconButton } from "@mui/material";
import EditIngredientDialog from "./EditIngredientDialog";
import CreateIngredientDialog from "./CreateIngredientDialog";
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
  } = useEntityStore();
  const {
    selectedIngredient,
    setSelectedIngredient
  } = useIngredientStore();

  const memoizedSearchResult = useMemo(() => searchResult, [searchResult]);

  async function loadIngredients() {
    try {
      setLoading(true);
      const take = 9;
      const response = await IngredientsApi.fetchIngredients(skip,take);
      setEntityCount(response.data.count);
      setSearchResult(response.data.ingredients)
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
        sx={{
          marginTop: "15px",
          marginBottom: '15px',
          userSelect: "none",
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
            <th>Edit&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {memoizedSearchResult && Array.isArray(memoizedSearchResult) && memoizedSearchResult.length > 0 ? (
            memoizedSearchResult.map((ingredient: IIngredient, index: number) => {
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
                key={index} style={{height:"52px"}}
              >
                <td
                  style={{
                    width: '40%'
                  }}
                >{ingredient.name}</td>
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
      />
      <CreateIngredientDialog
        onIngredientAdded={handleIngredientAdded}
      />
    </>
  );
};

export default IngredientTable;