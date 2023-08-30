import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, IconButton } from "@mui/material";
import PaginationFooter from "../../components/footer/PaginationFooter";
import * as componentsApi from "../../network/componentApi";
import useSearchStore from "../../stores/searchStore";
import { IComponent, IComponentData, IIngredientData } from "../../interfaces";
import EditIcon from "@mui/icons-material/Edit";
import useComponentStore from "../../stores/componentStore";
import { number } from "yup";
import AddComponentDialog from "./AddComponentDialog";
// import EditComponentDialog from "./EditComponentDIalog";

const ComponentTable: React.FC = () => {
  const [components, setComponents] = useState<IComponent[]>([]);
  const [componentsCount, setcomponentsCount] = useState(2);
  const { selectedComponent, setSelectedComponent } = useComponentStore();
  const [open, setOpen] = useState(false);
  // const [skip, setSkip] = useState(0);
  const { loading, setLoading } = useSearchStore();

  async function loadComponents() {
    try {
      setLoading(true);
      const response = await componentsApi.fetchComponents();
      setcomponentsCount(response.count);
      setComponents(response.data);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComponents(); // Call the function here to fetch initial data
  }, []);

  const handleComponentAdded = (newIngredient: any) => {
    setComponents((prevIngredients: any) => [
      ...prevIngredients,
      newIngredient,
    ]);
  };

  const handleEditClick = (row: any) => {
    setSelectedComponent(row);
    setTimeout(() => {
      setOpen(true);
    }, 0);
    console.log(row);
    console.log("Dialog should open now.");
  };

  const handleComponentUpdated = (updatedComponent: IComponent) => {
    const updatedIndex = components.findIndex(
      (component) => component.id === updatedComponent.id
    );

    if (updatedIndex !== -1) {
      const updatedComponents = [...components];
      updatedComponents[updatedIndex] = updatedComponent;
      setComponents(updatedComponents);
    }

    setOpen(false); // Close the edit dialog
    loadComponents(); // Fetch the updated list of ingredients
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
      <Table hoverRow sx={{ marginTop: "20px", userSelect: "none" }}>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Component Name&nbsp;</th>
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
          {components.map((component, index) => {
            let totalFats = 0;
            let totalCarbs = 0;
            let totalProteins = 0;
            let totalCalories = 0;
            let totalPrice = 0;
            return (
              <tr key={index}>
                <td>{component.name}</td>
                {component.component_ingredient.map((el, ingredientIndex) => {
                  totalFats += Number(el.ingredient.fats); // Increment totalFats
                  totalCarbs += Number(el.ingredient.carbs);
                  totalProteins += Number(el.ingredient.protein);
                  totalCalories += Number(
                    totalFats * 9 + totalCarbs * 4 + totalProteins * 4
                  );
                  totalPrice += Number(el.ingredient.price)
                  return null;
                })}
                <td>{totalCalories}</td>
                <td>{totalProteins}</td>
                <td>{totalCarbs}</td>
                <td>{totalFats}</td>
                <td>{component.unit}</td>
                <td>{totalPrice}</td>
                <td>
                  <IconButton onClick={() => handleEditClick(component)}>
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <EditComponentDialog
        key={selectedComponent?.id}
        open={open}
        setOpen={setOpen}
        onComponentUpdated={handleComponentUpdated}
        component={selectedComponent}
      /> */}
      <div
        style={{
          position: "absolute",
          bottom: "0vh",
          width: "100%",
          textAlign: "center",
        }}
      >
      </div>
      <AddComponentDialog onComponentAdded={handleComponentAdded} />
    </>
  );
};

export default ComponentTable;
