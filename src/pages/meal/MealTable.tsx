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

const MealTable: React.FC = () => {
  const [meals, setMeals] = useState<IMealData[]>([]);
  const { selectedMeal, setSelectedMeal } = useMealStore();
  const [open, setOpen] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { setEntityCount, skip, take, setTake, setTakeCondition } =
    useEntityStore();
  const { loading, setLoading, setSearchResult, searchResult } =
    useSearchStore();

  const memoizedSearchResult = useMemo(() => searchResult, [searchResult]);

  async function loadMeals() {
    try {
      setTakeCondition(setTake);
      setLoading(true);
      const data = {
        skip: skip,
        take: take,
      };
      const response = await mealApi.fetchMeals(data);
      setEntityCount(response.data.count);
      setSearchResult(response.data.meals);
      if (searchResult) {
        setMeals(searchResult);
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
                width: "40%",
                borderTopLeftRadius: "8px",
              }}
            >
              Meal Name&nbsp;
            </th>
            <th>Image&nbsp;</th>
            <th>Calories&nbsp;</th>
            <th>Proteins&nbsp;</th>
            <th>Carbs&nbsp;</th>
            <th>Fats&nbsp;</th>
            <th>Unit&nbsp;</th>
            <th>Price&nbsp;</th>
            <th>Edit&nbsp;</th>
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

              if (
                meal.meals_components &&
                Array.isArray(meal.meals_components)
              ) {
                meal.meals_components?.map((el: IMealComponent) => {
                  const quantity = Number(el.component_quantity);
                  el.component.components_ingredients?.map(
                    (el: IComponentIngredient) => {
                      totalFats += Number(el.ingredient.fats * quantity);
                      totalCarbs += Number(el.ingredient.carbs * quantity);
                      totalProteins += Number(el.ingredient.protein * quantity);
                      totalPrice += Number(el.ingredient.price * quantity);
                      totalCalories +=
                        totalFats * 9 + totalCarbs * 4 + totalProteins * 4;
                    }
                  );
                });
              }
              return (
                <tr key={index} style={{ height: "52px" }}>
                  <td>{meal.name}</td>
                  <td>
                    <img
                      src={`https://calo-nutritionist-planner-dev-meal-image-bucket.s3.amazonaws.com/processed/${meal.id}.jpeg`}
                      alt="Meal"
                    />
                  </td>
                  <td>{totalCalories.toFixed(3)}</td>
                  <td>{totalProteins.toFixed(3)}</td>
                  <td>{totalCarbs.toFixed(3)}</td>
                  <td>{totalFats.toFixed(3)}</td>
                  <td>{meal.unit}</td>
                  <td>{totalPrice.toFixed(3)}</td>
                  <td>
                    <IconButton onClick={() => handleEditClick(meal)}>
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
