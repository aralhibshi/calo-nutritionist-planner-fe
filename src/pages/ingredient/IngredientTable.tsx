import React, { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, IconButton } from "@mui/material";
import EditIngredientDialog from "./EditIngredientDialog";
import CreateIngredientDialog from "./CreateIngredientDialog";
import * as IngredientApi from "../../network/ingredientApi";
import useIngredientStore from "../../stores/ingredientStore";
import useSearchStore from "../../stores/searchStore";
import { IIngredient, IIngredientData } from "../../interfaces";
import EditIcon from "@mui/icons-material/Edit";
import useEntityStore from "../../stores/entityStore";
import TestPlaygroundDialog from "./TestPlaygroundDialog";

const IngredientTable: React.FC = () => {
  const [ingredients, setIngredients] = useState<IIngredientData[]>([]);
  const [testOpen, setTestOpen] = useState(false);
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
    setSelectedIngredient
  } = useIngredientStore();
  const {
    setSearchResult
  } = useSearchStore()

  // Memo
  const memoizedResult = useMemo(() => result, [result]);

  async function loadIngredients() {
    try {
      console.log(window.innerHeight);
      setTakeCondition(setTake);
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
    }
  }

  useEffect(() => {
    loadIngredients();
  }, [take, skip]);

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

  const handleTestOpen = () => {
    setTestOpen(true);
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
        {memoizedResult && Array.isArray(memoizedResult) && memoizedResult.length > 0 ? (
            memoizedResult.map((ingredient: IIngredient, index: number) => {
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
                    width: '40%',
                    cursor: 'pointer'
                  }}
                  onClick={handleTestOpen}
                >
                  {ingredient.name}</td>
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
      <TestPlaygroundDialog
        open={testOpen}
        setOpen={setTestOpen}
      />
      <CreateIngredientDialog
        onIngredientAdded={handleIngredientAdded}
      />
    </>
  );
};

export default IngredientTable;