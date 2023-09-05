import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Backdrop, Checkbox, Chip, Stack } from "@mui/material";
import * as IngredientApi from "../../network/ingredientApi";
import useIngredientStore from "../../stores/ingredientStore";
import useSearchStore from "../../stores/searchStore";
import { IIngredient } from "../../interfaces";
import useEntityStore from "../../stores/entityStore";
import { Input } from "@mui/material";
import TextField from "@mui/material/TextField";

interface ComponentIngredientTableProps {}

const ComponentIngredientTable: React.FC<
  ComponentIngredientTableProps
> = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [quantities, setQuantities] = useState<{
    [ingredientId: string]: number;
  }>({});
  const {
    componentLoading,
    setComponentLoading,
    componentSearchResult,
    setComponentSearchResult,
  } = useSearchStore();
  const { setEntityCount, skip } = useEntityStore();
  const { selectedIngredients, setSelectedIngredients, calories, setCalories } =
    useIngredientStore();

  async function loadIngredients() {
    try {
      setComponentLoading(true);
      const data = {
        skip: 0,
        take: 100
      }
      const response = await IngredientApi.fetchIngredients(data);
      
      setComponentSearchResult(response.data.ingredients);
      if (componentSearchResult) {
        setIngredients(componentSearchResult);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setComponentLoading(false);
    }
  }

  useEffect(() => {
    loadIngredients();
  }, [skip]);

  const handleQuantityChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    ingredientId: string
  ) => {
    const newQuantity = parseInt(e.currentTarget.value, 10);

    const quantity = isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity;

    setQuantities({
      ...quantities,
      [ingredientId]: quantity,
    });
  };

  const handleSelectClick = (row: any) => {
    const isSelected = selectedIngredients.some(
      (ingredient) => ingredient.ingredient_id === row.id
    );

    let updatedSelectedIngredients: any[];

    if (isSelected) {
      updatedSelectedIngredients = selectedIngredients.filter(
        (ingredient) => ingredient.ingredient_id !== row.id
      );
    } else {
      updatedSelectedIngredients = [
        ...selectedIngredients,
        {
          ingredient_id: row.id,
          ingredient_quantity: quantities[row.id] || 1,
        },
      ];
    }

    setSelectedIngredients(updatedSelectedIngredients);

    // const totalCalories = updatedSelectedIngredients.reduce((total, ingredient) => {
    //   const ingredientCalories = Number((ingredient.ingredient.carbs*4)+(ingredient.ingredient.protein*4)+(ingredient.ingredient.fats*9));
    //   return total + (ingredientCalories * (ingredient.ingredient_quantity || 1));
    // }, 0);
    // setCalories(totalCalories)

    console.log("selected Ingredients", updatedSelectedIngredients);
  };

  const checkedIngredients = selectedIngredients
    .filter((ingredient) =>
      componentSearchResult.some(
        (searchIngredient: { id: string }) =>
          searchIngredient.id === ingredient.ingredient_id
      )
    )
    .map((ingredient) =>
      componentSearchResult.find(
        (searchIngredient: { id: string }) =>
          searchIngredient.id === ingredient.ingredient_id
      )
    );

    let totalCalories = 0;

checkedIngredients.forEach((ingredient) => {
  const fats = Number(ingredient.fats);
  const carbs = Number(ingredient.carbs);
  const protein = Number(ingredient.protein);
  
  const quantity = quantities[ingredient.id] || 1;
  
  if (!isNaN(fats) && !isNaN(carbs) && !isNaN(protein) && !isNaN(quantity)) {
    totalCalories += (fats * 9 + carbs * 4 + protein * 4) * quantity;
  }
});

  return (
    <>
      {componentLoading && (
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
          {checkedIngredients.map((ingredient, index) => (
            <Chip
              key={index}
              label={ingredient.name}
              color="primary"
              style={{ marginBottom: "10px" }}
              avatar={<Avatar>{quantities[ingredient.id] || 1}</Avatar>}
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
                <th>Ingredient Name&nbsp;</th>
                <th>Quantity&nbsp;(in grams)</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {componentSearchResult &&
              Array.isArray(componentSearchResult) &&
              componentSearchResult.length > 0 ? (
                componentSearchResult.map(
                  (ingredient: IIngredient, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{ingredient.name}</td>
                        <td>
                          <Input
                            type="number"
                            inputProps={{
                              min: 1,
                              value: quantities[ingredient.id] || 1, // Set the default value to 1
                              onChange: (e) =>
                                handleQuantityChange(e, ingredient.id),
                            }}
                            sx={{ width: "50px" }}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="success"
                            onChange={() => handleSelectClick(ingredient)}
                          />
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan={8}>No search results found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </div>
      <br/>
          <TextField
            label="Calories"
            name="description"
            disabled
            value={totalCalories}
            fullWidth
            margin="dense"
          />
    </>
  );
};

export default ComponentIngredientTable;
