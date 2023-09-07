import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Backdrop, Chip, Stack, TextField } from "@mui/material";
import * as ComponentApi from "../../network/componentApi";
import useSearchStore from "../../stores/searchStore";
import {
  IComponent,
  IComponentIngredient,
  IIngredient,
  IMeal,
} from "../../interfaces";
import useEntityStore from "../../stores/entityStore";
import { Input } from "@mui/material";
import useComponentStore from "../../stores/componentStore";
import Checkbox from "@mui/material/Checkbox";

interface MealComponentTableProps {}

const MealComponentTable: React.FC<MealComponentTableProps> = () => {
  const [components, setComponents] = useState<IComponent[]>([]);
  const [quantities, setQuantities] = useState<{
    [componentId: string]: number;
  }>({});
  const { mealLoading, setMealLoading, mealSearchResult, setMealSearchResult } =
    useSearchStore();
  const { setEntityCount, skip } = useEntityStore();
  const { selectedComponents, setSelectedComponents } = useComponentStore();

  async function loadComponents() {
    try {
      setMealLoading(true);
      const data = {
        skip: skip,
        take: 100,
      };
      const response = await ComponentApi.fetchComponents(data);
      setMealSearchResult(response.data.components);
      if (mealSearchResult) {
        setComponents(mealSearchResult);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setMealLoading(false);
    }
  }

  useEffect(() => {
    loadComponents();
  }, [skip]);

  const handleQuantityChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    componentId: string
  ) => {
    const newQuantity = parseInt(e.currentTarget.value, 10);

    const quantity = isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity;

    setQuantities({
      ...quantities,
      [componentId]: quantity,
    });
  };

  const handleSelectClick = (row: IMeal) => {
    const isSelected = selectedComponents.some(
      (component) => component.component_id === row.id
    );

    let updatedSelectedComponents: any[];

    if (isSelected) {
      updatedSelectedComponents = selectedComponents.filter(
        (component) => component.component_id !== row.id
      );
    } else {
      updatedSelectedComponents = [
        ...selectedComponents,
        {
          component_id: row.id,
          component_quantity: quantities[row.id] || 1,
        },
      ];
    }

    setSelectedComponents(updatedSelectedComponents);
    console.log("selected components", updatedSelectedComponents);
  };

  const checkedComponents = selectedComponents
    .filter((component) =>
      mealSearchResult.some(
        (searchComponent: { id: string }) =>
          searchComponent.id === component.component_id
      )
    )
    .map((component) =>
      mealSearchResult.find(
        (searchComponent: { id: string }) =>
          searchComponent.id === component.component_id
      )
    );
  let fats= 0;
  let carbs = 0;
  let proteins = 0;
  let totalFats = 0;
  let totalCarbs = 0;
  let totalProteins = 0;
  let totalCalories = 0;

  checkedComponents.forEach((component) => {
    console.log("component",component)
    const quantity = quantities[component.id] || 1;
    const el = component.components_ingredients;
    el.forEach((component_ingredient: IComponentIngredient) => {
      const ingredient_quantity = component_ingredient.ingredient_quantity
      fats = Number(component_ingredient.ingredient.fats)
      carbs = Number(component_ingredient.ingredient.carbs)
      proteins = Number(component_ingredient.ingredient.protein)
      totalFats += Number(fats * ingredient_quantity);
      totalCarbs += Number(carbs * ingredient_quantity);
      totalProteins += Number(proteins * ingredient_quantity);
    });
    totalFats *= quantity;
    totalCarbs *= quantity;
    totalProteins *= quantity;
    totalCalories = Number(totalFats*9 + totalCarbs*4 + totalProteins*4);
    console.log(totalCalories)
  });
 

  // console.log("Total Fats:", totalFats);
  // console.log("Total Carbs:", totalCarbs);
  // console.log("Total Proteins:", totalProteins);

  return (
    <>
      {mealLoading && (
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
      <div
        style={{
          marginTop: "12px",
          overflowY: "auto",
          maxHeight: "300px",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          style={{ marginBottom: "10px" }}
        >
          {checkedComponents.map((component, index) => (
            <Chip
              key={index}
              label={component.name}
              color="primary"
              style={{ marginBottom: "10px" }}
              avatar={<Avatar>{quantities[component.id] || 1}</Avatar>}
            />
          ))}
        </Stack>
        <TableContainer
          style={{ maxHeight: "300px", position: "sticky", top: "40px" }}
        >
          <Table
            stickyHeader
            sx={{
              userSelect: "none",
              width: "100%",
            }}
            id="table"
          >
            <thead>
              <tr>
                <th>Component Name&nbsp;</th>
                <th>Quantity&nbsp;(in grams)</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {mealSearchResult &&
              Array.isArray(mealSearchResult) &&
              mealSearchResult?.length > 0 ? (
                mealSearchResult?.map((meal: IMeal, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{meal.name}</td>
                      <td>
                        <Input
                          type="number"
                          inputProps={{
                            min: 1,
                            value: quantities[meal.id] || 1, // Set the default value to 1
                            onChange: (e) => handleQuantityChange(e, meal.id),
                          }}
                          sx={{ width: "50px" }}
                        />
                      </td>
                      <td>
                        <Checkbox
                          color="success"
                          onChange={() => handleSelectClick(meal)}
                        />
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
        </TableContainer>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <TextField
            label="Calories"
            name="description"
            disabled
            value={totalCalories.toFixed(3)}
            fullWidth
            margin="dense"
          />
        </div>
        <div
          style={{
            flex: 1,
            marginBottom: "20px",
            display: "flex",
            justifyContent: "column",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <TextField
            label="Proteins"
            name="protein"
            disabled
            value={totalProteins.toFixed(3)}
            fullWidth
            margin="dense"
          />
        </div>
        <div
          style={{
            flex: 1,
            marginBottom: "20px",
            display: "flex",
            justifyContent: "column",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <TextField
            label="Carbs"
            name="carbs"
            disabled
            value={totalCarbs.toFixed(3)}
            fullWidth
            margin="dense"
          />
        </div>
        <div
          style={{
            flex: 1,
            marginBottom: "20px",
            display: "flex",
            justifyContent: "column",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <TextField
            label="Fats"
            name="fats"
            disabled
            value={totalFats.toFixed(3)}
            fullWidth
            margin="dense"
          />
        </div>
      </div>
    </>
  );
};

export default MealComponentTable;
