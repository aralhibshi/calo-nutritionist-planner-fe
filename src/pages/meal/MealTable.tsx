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
  const { selectedMeal, setSelectedMeal } = useMealStore();
  const [open, setOpen] = useState(false);

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
      if (result) {
        setMeals(result);
      }
      calculateMeals();
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

  const memoizedSearchResult = useMemo(() => result, [result]);

  const handleMealAdded = (newComponent: any) => {
    setMeals((prevComponents: any) => [...prevComponents, newComponent]);
    loadMeals();
  };
  const handleEditClick = (row: any) => {
    setSelectedMeal(row);
    setOpenEditDialog(true);
    setTimeout(() => {}, 0);
    setTimeout(() => {
      const barChart = document.querySelector(
        ".css-18ftw0b-MuiChartsSurface-root"
      );
      barChart?.setAttribute("viewBox", "0 15 400 280");
    }, 20);
  };

  const handleMealUpdated = (updatedMeal: IMealData) => {
    const updatedIndex = meals.findIndex((meal) => meal.id === updatedMeal.id);

    if (updatedIndex !== -1) {
      const updatedMeals = [...meals];
      updatedMeals[updatedIndex] = updatedMeal;
      setMeals(updatedMeals);
    }

    setOpenEditDialog(false);
    loadMeals();
  };

  let image = "";
  
  const calculationArray: any = []

  const calculateMeals = () => {
    console.log('Meals Result', memoizedSearchResult)
    memoizedSearchResult.forEach((meal: IMeal) => {
      let mealFats = 0;
      let mealCarbs = 0;
      let mealProteins = 0;
      let mealCalories = 0;
      let mealPrice = 0;

      meal.meals_components.forEach((el: IMealComponent) => {
        let componentFats = 0
        let componentCarbs = 0
        let componentProtein = 0
        let componentPrice = 0
        let componentQuantity = 0

        const quantity = Number(el.component_quantity);

        el.component.components_ingredients?.forEach(
          (el: IComponentIngredient) => {
            componentFats += Number(el.ingredient.fats * el.ingredient_quantity);
            componentCarbs += Number(el.ingredient.carbs * el.ingredient_quantity);
            componentProtein += Number(el.ingredient.protein * el.ingredient_quantity);
            componentPrice += Number(el.ingredient.price * el.ingredient_quantity);
            componentQuantity += Number(el.ingredient_quantity);
          }
        );

        componentFats /= componentQuantity
        componentCarbs /= componentQuantity
        componentProtein /= componentQuantity
        componentPrice /= componentQuantity

        mealProteins += componentProtein * quantity;
        mealCarbs += componentCarbs * quantity;
        mealFats += componentFats * quantity;
        mealPrice += componentPrice * quantity;
      });

      mealCalories = mealFats * 9 + mealCarbs * 4 + mealProteins * 4;

      calculationArray.push({
        id: meal.id,
        name: meal.name,
        fats: Number(mealFats.toFixed(3)),
        proteins: Number(mealProteins.toFixed(3)),
        carbs: Number(mealCarbs.toFixed(3)),
        price: Number(mealPrice.toFixed(3)),
        calories: Number(mealCalories.toFixed(3)),
        unit: meal.unit
      });
    });
    console.log(calculationArray);
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
            <th>Unit&nbsp;</th>
            <th>Price&nbsp;</th>
            <th>Actions&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {calculationArray && Array.isArray(calculationArray) && calculationArray.length > 0 ? (
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
              <td>{meal.unit}</td>
              <td>{meal.price.toFixed(3)}</td>
              <td>
                <Tooltip
                  title='Edit'
                  followCursor
                >
                  <IconButton
                    onClick={() => handleEditClick(meal)}
                    color='success'
                  >
                    <EditIcon
                      color='primary'
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