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
    setResult
  } = useEntityStore();
  const {
    setSearchResult
  } = useSearchStore();

  const memoizedSearchResult = useMemo(() => result, [result]);

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
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, [take, skip]);

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

  // try IMealData ?
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
          {memoizedSearchResult &&
          Array.isArray(memoizedSearchResult) &&
          memoizedSearchResult?.length > 0 ? (
            memoizedSearchResult?.map((meal: IMeal, index: number) => {
              let totalFats = 0;
              let totalCarbs = 0;
              let totalProteins = 0;
              let totalCalories = 0;
              let totalPrice = 0;
              let totalQuantity = 0;

              if (
                meal.meals_components &&
                Array.isArray(meal.meals_components)
              ) {
                meal.meals_components?.map((el: IMealComponent) => {

                  const quantity = Number(el.component_quantity);

                  el.component.components_ingredients?.map(
                    (el: IComponentIngredient) => {

                      totalFats += Number(el.ingredient.fats * el.ingredient_quantity);
                      totalCarbs += Number(el.ingredient.carbs * el.ingredient_quantity);
                      totalProteins += Number(el.ingredient.protein * el.ingredient_quantity);
                      totalPrice += Number(el.ingredient.price * el.ingredient_quantity);

                      totalQuantity += Number(el.ingredient_quantity);

                    }
                  );

                  totalProteins /= totalQuantity
                  totalCarbs /= totalQuantity
                  totalFats /= totalQuantity
                  totalPrice /= totalQuantity

                  totalProteins += Number(
                    (totalProteins * quantity).toFixed(3)
                  );
                  totalCarbs += Number((totalCarbs * quantity).toFixed(3));
                  totalFats += Number((totalFats * quantity).toFixed(3));
                  totalPrice += Number((totalPrice * quantity).toFixed(3));

                  totalCalories =
                  (totalFats * 9 + totalCarbs * 4 + totalProteins * 4)
                });
              }
              return (
                <tr
                  key={index}
                  style={{
                    height: '52px',
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
                      style={{
                        verticalAlign: 'middle'
                      }}
                    />
                  </td>
                  <td
                    style={{
                      textAlign: 'left'
                    }}
                  >{meal.name}</td>
                  <td>{totalCalories.toFixed(3)}</td>
                  <td>{totalProteins.toFixed(3)}</td>
                  <td>{totalCarbs.toFixed(3)}</td>
                  <td>{totalFats.toFixed(3)}</td>
                  <td>{meal.unit}</td>
                  <td>{totalPrice.toFixed(3)}</td>
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
              );
            })
          ) : (
            <tr>
              <td colSpan={8}>No search results found.</td>
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
