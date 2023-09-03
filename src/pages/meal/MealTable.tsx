import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import { Backdrop, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import * as mealApi from "../../network/mealApi";
import useSearchStore from "../../stores/searchStore";
import useEntityStore from "../../stores/entityStore";
import { IComponentIngredient, IMeal, IMealComponent } from "../../interfaces";
import useMealStore from "../../stores/mealStore";
import CreateMealDialog from "./CreateMealDialog";

const MealTable: React.FC = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const { selectedMeal, setSelectedMeal } = useMealStore();
  const [open, setOpen] = useState(false);

  const { setEntityCount, skip } = useEntityStore();
  const { loading, setLoading, setSearchResult, searchResult } =
    useSearchStore();

  async function loadMeals() {
    try {
      setLoading(true);
      const response = await mealApi.fetchMeals(skip);
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
  }, [skip]);

  const handleMealAdded = (newComponent: any) => {
    setMeals((prevComponents: any) => [
      ...prevComponents,
      newComponent,
    ]);
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
                width: "40%",
                borderTopLeftRadius: "8px",
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
            <th>Edit&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {searchResult && Array.isArray(searchResult) && searchResult.length > 0 ? (
            searchResult.map((meal: IMeal, index: number) => {
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
                  el.component.components_ingredients?.map(
                    (el: IComponentIngredient) => {
                      totalFats += Number(el.ingredient.fats);
                      totalCarbs += Number(el.ingredient.carbs);
                      totalProteins += Number(el.ingredient.protein);
                      totalCalories +=
                        totalFats * 9 + totalCarbs * 4 + totalProteins * 4;
                      totalPrice += Number(el.ingredient.price);
                    }
                  );
                });

                totalFats = Number(totalFats.toFixed(3));
                totalCarbs = Number(totalCarbs.toFixed(3));
                totalProteins = Number(totalProteins.toFixed(3));
                totalCalories = Number(totalCalories.toFixed(3));
                totalPrice = Number(totalPrice.toFixed(3));
              }

              return (
                <tr key={index}>
                  <td>{meal.name}</td>
                  <td>{totalCalories}</td>
                  <td>{totalProteins}</td>
                  <td>{totalCarbs}</td>
                  <td>{totalFats}</td>
                  <td>{meal.unit}</td>
                  <td>{totalPrice}</td>
                  <td>
                    <IconButton
                    // onClick={() => handleEditClick(component)}
                    >
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
      <CreateMealDialog onMealAdded={handleMealAdded}/>
    </>
  );
};

export default MealTable;
