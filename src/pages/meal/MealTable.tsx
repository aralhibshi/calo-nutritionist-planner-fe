import React, { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import { Backdrop, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import * as mealApi from "../../network/mealApi";
import useSearchStore from "../../stores/searchStore";
import useEntityStore from "../../stores/entityStore";
import {
  IComponentIngredient,
  IMeal,
  IMealComponent,
  IMealData,
} from "../../interfaces";
import useMealStore from "../../stores/mealStore";
import CreateMealDialog from "./CreateMealDialog";
import EditMealDialog from "./EditMealDialog";
import Tooltip from "@mui/material/Tooltip";
import ImageIcon from '@mui/icons-material/Image';

const MealTable: React.FC = () => {
  const [meals, setMeals] = useState<IMealData[]>([]);
  const [open, setOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(true);
  const [calculationArray, setCalculationArray] = useState<any[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const {
    setEntityCount,
    skip,
    take,
    setTake,
    setTakeCondition,
    loading,
    setLoading,
    result,
    setResult,
    entity
  } = useEntityStore();
  const {
    setSearchResult
  } = useSearchStore();
  const {
    selectedMeal,
    setSelectedMeal
  } = useMealStore();


  // const memoizedSearchResult = useMemo(() => result, [result]);

  async function loadMeals() {
    try {
      setTakeCondition(setTake, 'meal');
      setSearchResult(false);
      setLoading(true);
      const data = {
        skip: skip,
        take: take,
      };
      const response = await mealApi.fetchMeals(data);
      setEntityCount(response.data.count);
      setResult(response.data.meals);
      await calculateMeals(response.data.meals);
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, [entity, take, skip]);

  const handleMealAdded = (newComponent: any) => {
    setMeals((prevComponents: any) => [...prevComponents, newComponent]);
    loadMeals();
  };

  const handleEditClick = (row: any) => {
    setSelectedMeal(row);
    setOpenEditDialog(true);
  };

  const handleMealUpdated = (updatedMeal: IMealData) => {
    const updatedMeals = meals.map((meal) =>
      meal.id === updatedMeal.id ? updatedMeal : meal
    );

    setMeals(updatedMeals);
    setOpenEditDialog(false);
    loadMeals();
  };

  let tempArray: any = [];

  const calculateMeals = async (meals: IMeal[]) => {
    if (!meals) return;

    setIsCalculating(false);

    meals.forEach((meal) => {
      let mealFats = 0;
      let mealCarbs = 0;
      let mealProteins = 0;
      let mealCalories = 0;
      let mealPrice = 0;
      let mealGrams = 0;

      if (meal.meals_components) {
        meal.meals_components.forEach((el) => {
          let componentFats = 0;
          let componentCarbs = 0;
          let componentProtein = 0;
          let componentPrice = 0;
          let componentQuantity = 0;

          const quantity = Number(el.component_quantity);

          if (el.component.components_ingredients) {
            el.component.components_ingredients.forEach((ing) => {
              componentFats += Number(ing.ingredient.fats * ing.ingredient_quantity);
              componentCarbs += Number(ing.ingredient.carbs * ing.ingredient_quantity);
              componentProtein += Number(ing.ingredient.protein * ing.ingredient_quantity);
              componentPrice += Number(ing.ingredient.price * ing.ingredient_quantity);
              componentQuantity += Number(ing.ingredient_quantity);
            });
          }

          componentFats /= componentQuantity;
          componentCarbs /= componentQuantity;
          componentProtein /= componentQuantity;
          componentPrice /= componentQuantity;

          mealProteins += componentProtein * quantity;
          mealCarbs += componentCarbs * quantity;
          mealFats += componentFats * quantity;
          mealPrice += componentPrice * quantity;
          mealGrams += quantity
        });
      }

      mealCalories = mealFats * 9 + mealCarbs * 4 + mealProteins * 4;

      tempArray.push({
        id: meal.id,
        name: meal.name,
        fats: Number(mealFats.toFixed(3)),
        proteins: Number(mealProteins.toFixed(3)),
        carbs: Number(mealCarbs.toFixed(3)),
        price: Number(mealPrice.toFixed(3)),
        calories: Number(mealCalories.toFixed(3)),
        grams: Number(mealGrams.toFixed(3))
      });
    });
    setCalculationArray(tempArray)
    
    console.log('Calc', calculationArray);
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
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Table
        sx={{
          marginTop: "15px",
          marginBottom: "15px",
          userSelect: "none",
        }}
        id="table"
      >
        <thead>
          <tr>
            <th
              style={{
                width: '6%',
                padding: 0,
                textAlign: 'center',
                verticalAlign: 'middle'
              }}
            >
              <ImageIcon
                sx={{
                  verticalAlign: 'middle'
                }}
              />
            </th>
            <th
              style={{
                textAlign: 'left'
              }}
            >
              Meal Name&nbsp;
            </th>
            <th>Calories&nbsp;</th>
            <th>Proteins&nbsp;</th>
            <th>Carbs&nbsp;</th>
            <th>Fats&nbsp;</th>
            <th>Grams&nbsp;</th>
            <th>Price&nbsp;</th>
            <th>Actions&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {calculationArray &&
            Array.isArray(calculationArray) &&
            calculationArray.length > 0 ? (
              calculationArray.map((meal: any, index: number) => (
                <tr
                  key={index}
                  style={{
                    height: '52px'
                  }}
                >
                  <td
                    style={{
                      textAlign: 'center',
                      padding: 0
                    }}
                  >
                    <img
                      src={`https://calo-nutritionist-planner-dev-meal-image-bucket.s3.amazonaws.com/processed/${meal.id}.jpeg`}
                      alt="Meal"
                      style={{ verticalAlign: 'middle' }}
                    />
                  </td>
                  <td
                    style={{
                      textAlign: 'left'
                    }}
                  >
                    {meal.name}
                  </td>
                  <td>{meal.calories.toFixed(3)}</td>
                  <td>{meal.proteins.toFixed(3)}</td>
                  <td>{meal.carbs.toFixed(3)}</td>
                  <td>{meal.fats.toFixed(3)}</td>
                  <td>{meal.grams}</td>
                  <td>{meal.price.toFixed(3)}</td>
                  <td>
                    <Tooltip
                      title="Edit"
                      followCursor
                    >
                      <IconButton
                        onClick={() => handleEditClick(meal)}
                        color="success"
                      >
                        <EditIcon
                          color="primary"
                        />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}>No search results found.
                </td>
              </tr>
            )}
        </tbody>
      </Table>
      <EditMealDialog
        key={selectedMeal?.id}
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onMealUpdated={handleMealUpdated}
        meal={selectedMeal}
      />
      <CreateMealDialog onMealAdded={handleMealAdded} />
    </>
  );
};

export default MealTable;
