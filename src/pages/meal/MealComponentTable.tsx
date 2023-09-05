import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Backdrop, Chip, Stack } from "@mui/material";
import * as ComponentApi from "../../network/componentApi";
import useSearchStore from "../../stores/searchStore";
import { IComponent, IIngredient } from "../../interfaces";
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
        take: 100
      }
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

  const handleSelectClick = (row: any) => {
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
                mealSearchResult?.map(
                  (component: IComponent, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{component.name}</td>
                        <td>
                          <Input
                            type="number"
                            inputProps={{
                              min: 1,
                              value: quantities[component.id] || 1, // Set the default value to 1
                              onChange: (e) =>
                                handleQuantityChange(e, component.id),
                            }}
                            sx={{ width: "50px" }}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="success"
                            onChange={() => handleSelectClick(component)}
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
