import * as React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from "@mui/joy/Table";
import AddIngredientDialog from "./AddIngredientDialog";
import * as IngredientsApi from "../../network/ingredientApi";
import { IIngredientData } from "../../interfaces";
import IngredientDetailModal from "./IngredientDetailModal";
import useSelectedIngredientStore from "./selectedIngredientStore";
import PaginationFooter from "../../components/footer/PaginationFooter";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import Button from "@mui/material/Button";

const IngredientTable: React.FC = () => {
  const [ingredients, setIngredients] = useState<any>([]);
  const [ingredientsCount, setIngredientsCount] = useState(2);
  const { selectedIngredient, setSelectedIngredient } =
    useSelectedIngredientStore();
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadIngredients() {
      try {
        setLoading(true);
        const response = await IngredientsApi.fetchIngredients(skip);
        setIngredientsCount(response.count);
        setIngredients(response.data);
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setLoading(false);
      }
    }
    loadIngredients();
  }, [skip]);

  const handleIngredientAdded = (newIngredient: any) => {
    setIngredients((prevIngredients: any) => [
      ...prevIngredients,
      newIngredient,
    ]);
  };

  const handleRowClick = (row: any) => {
    setSelectedIngredient(row);
    setOpen(true);

    setTimeout(() => {
      resizePieChart();
    }, 1);

    console.log(row);
  };
  const handleSaveIngredient = (updatedIngredient: IIngredientData) => {
    async function loadIngredients() {
      try {
        const ingredients = await IngredientsApi.fetchIngredients(skip);
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadIngredients();
  };

  const resizePieChart = () => {
    const svgElement = document.querySelector(
      ".css-18ftw0b-MuiChartsSurface-root"
    );

    if (svgElement) {
      svgElement.setAttribute("viewBox", "40 45 330 220");
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
          open={true}
        >
          <CircularProgress
          color="inherit"
          />
        </Backdrop>
      ) : null}
      <Table hoverRow sx={{ marginTop: "40px", userSelect: "none" }}>
        <thead>
        <tr>
          <th style={{ width: "40%" }}>
            Ingredient &nbsp;
            <Button
              variant='contained'
              type="submit"
              onClick={() => setAddOpen(true)}
              style={{
                fontWeight: 'bold',
                scale: '70%'
              }}
            >
              Add Ingredient &nbsp;
              <FontAwesomeIcon
                icon={['fas', 'square-plus']}
                style={{
                  scale: '140%',
                  cursor: 'pointer'
                }}
              />
            </Button>
          </th>
          <th>Calories&nbsp;</th>
          <th>Protein&nbsp;</th>
          <th>Carbs&nbsp;</th>
          <th>Fat&nbsp;</th>
          <th>Unit&nbsp;</th>
          <th>Price&nbsp;(BHD)</th>
        </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient: any) => {
            const calories: string = (
              (ingredient.fats * 9 + ingredient.carbs * 4 + ingredient.protein * 4)
                .toFixed(3)
                .padEnd(5, '0')
            );
            return (
              <tr
                key={ingredient.id}
                onClick={() => handleRowClick(ingredient)}
                style={{ cursor: "pointer" }}
              >
                <td>{ingredient.name}</td>
                <td>{calories}</td>
                <td>{ingredient.protein}</td>
                <td>{ingredient.carbs}</td>
                <td>{ingredient.fats}</td>
                <td>{ingredient.unit}</td>
                <td>{ingredient.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <IngredientDetailModal
        open={open}
        handleClose={handleCloseModal}
        onSave={handleSaveIngredient}
        ingredient={selectedIngredient}
      />
      <div style={{ position: 'absolute', bottom: '2vh', width: '100%', left: '42vw', textAlign: 'center' }}>
      <PaginationFooter
        ingredientsCount={ingredientsCount}
        setSkip={setSkip}
      />
      </div>
      <AddIngredientDialog
        addOpen={addOpen}
        setAddOpen={setAddOpen}
        onIngredientAdded={handleIngredientAdded}
      />
    </>
  );
};

export default IngredientTable;