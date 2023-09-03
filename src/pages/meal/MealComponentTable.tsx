import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as ComponentsApi from "../../network/componentApi"
import useSearchStore from "../../stores/searchStore";
import { IComponent, IIngredient } from "../../interfaces";
import useEntityStore from "../../stores/entityStore";
import { Input } from "@mui/material";
import useComponentStore from "../../stores/componentStore";

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
      const response = await ComponentsApi.fetchComponents(skip);
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

  const handleSelectClick = (row: any) => {
    const updatedSelectedComponents: any = [...selectedComponents];
    const ingredientIndex = updatedSelectedComponents.findIndex(
      (component: any) => component.ingredient_id === row.id
    );

    if (ingredientIndex !== -1) {
        updatedSelectedComponents.splice(ingredientIndex, 1);
    } else {
      // Check if the quantity is greater than 0 before adding the ingredient
      if (quantities[row.id] > 0) {
        updatedSelectedComponents.push({
          component_id: row.id,
          component_quantity: quantities[row.id],
        });
      }
    }

    setSelectedComponents(updatedSelectedComponents);
    console.log("selected components", updatedSelectedComponents);
  };

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
        <TableContainer>
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
              mealSearchResult.length > 0 ? (
                mealSearchResult.map(
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
                          <Input
                            type="checkbox"
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
    </>
  );
};

export default MealComponentTable;
