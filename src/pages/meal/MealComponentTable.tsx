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
  IMeal,
} from "../../interfaces";
import useEntityStore from "../../stores/entityStore";
import { Input } from "@mui/material";
import useComponentStore from "../../stores/componentStore";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";

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
  const {
    setSearchResult
  } = useSearchStore();

  async function loadComponents() {
    try {
      setSearchResult(false);
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

    let calculationArray: any = [];
  let mealFats = 0;
  let mealProteins = 0
  let mealCarbs = 0
  let mealCalories = 0

  checkedComponents.forEach((component) => {
    let componentFats = 0;
    let componentCarbs = 0;
    let componentProteins = 0;
    let componentCalories = 0;
    let componentQuantity = 0

    console.log("component",component)

    let quantity = quantities[component.id] || 1;
    const el = component.components_ingredients;
    
    el.forEach((component_ingredient: IComponentIngredient) => {
      componentFats += Number(component_ingredient.ingredient.fats * component_ingredient.ingredient_quantity);
      componentCarbs += Number(component_ingredient.ingredient.carbs * component_ingredient.ingredient_quantity);
      componentProteins += Number(component_ingredient.ingredient.protein * component_ingredient.ingredient_quantity);
      componentQuantity += Number(component_ingredient.ingredient_quantity)
    });

    componentProteins /= componentQuantity;
    componentCarbs /= componentQuantity;
    componentFats /= componentQuantity;

    componentFats *= quantity;
    componentCarbs *= quantity;
    componentProteins *= quantity;
    componentCalories = Number((componentFats * 9) + (componentCarbs * 4) + (componentProteins * 4));
    console.log(componentCalories)

    calculationArray.push({
      fats: componentFats,
      proteins: componentProteins,
      carbs: componentCarbs,
      calories: componentCalories
    })
  });

  // Calculate Meal Totals
  calculationArray.forEach((calculatedComponent: any) => {
    mealFats += calculatedComponent.fats;
    mealProteins += calculatedComponent.proteins;
    mealCarbs += calculatedComponent.carbs;
    mealCalories += calculatedComponent.calories;
  });

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
                <th>Quantity&nbsp;per(G/L)</th>
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
                            value: quantities[meal.id] || 1,
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
      <Tooltip
        title='Read-Only'
        followCursor
      >
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
              value={mealCalories.toFixed(3)}
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
              value={mealProteins.toFixed(3)}
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
              value={mealCarbs.toFixed(3)}
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
              value={mealFats.toFixed(3)}
              fullWidth
              margin="dense"
            />
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default MealComponentTable;
