import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, IconButton } from "@mui/material";
import * as componentsApi from "../../network/componentApi";
import useSearchStore from "../../stores/searchStore";
import { IComponent } from "../../interfaces";
import EditIcon from "@mui/icons-material/Edit";
import useComponentStore from "../../stores/componentStore";
import AddComponentDialog from "./AddComponentDialog";
import useEntityStore from "../../stores/entityStore";
// import EditComponentDialog from "./EditComponentDIalog";

const ComponentTable: React.FC = () => {
  const [components, setComponents] = useState<IComponent[]>([]);
  const { selectedComponent, setSelectedComponent } = useComponentStore();
  const [open, setOpen] = useState(false);
  const { loading, setLoading } = useSearchStore();
  const {
    setEntityCount,
    skip,
    setSkip
  } = useEntityStore();
  const {
    setSearchResult,
    searchResult
  } = useSearchStore();

  async function loadComponents() {
    try {
      setLoading(true);
      const response = await componentsApi.fetchComponents(skip);
      setEntityCount(response.count);
      setSearchResult(response.data)
      if (searchResult) {
        setComponents(response.data);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComponents();
  }, [skip]);

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

    setOpen(false);
    loadComponents();
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
            {/* <th>Edit&nbsp;</th> */}
          </tr>
        </thead>
        <tbody>
          {searchResult && Array.isArray(searchResult) ? (
            searchResult.map((component: IComponent, index: number) => {
              let totalFats = 0;
              let totalCarbs = 0;
              let totalProteins = 0;
              let totalCalories = 0;
              let totalPrice = 0;

              if (component.component_ingredient && Array.isArray(component.component_ingredient)) {
                component.component_ingredient.forEach((el) => {
                  totalFats += Number(el.ingredient.fats);
                  totalCarbs += Number(el.ingredient.carbs);
                  totalProteins += Number(el.ingredient.protein);
                  totalCalories += totalFats * 9 + totalCarbs * 4 + totalProteins * 4;
                  totalPrice += Number(el.ingredient.price);
                });

                totalFats = Number(totalFats.toFixed(3));
                totalCarbs = Number(totalCarbs.toFixed(3));
                totalProteins = Number(totalProteins.toFixed(3));
                totalCalories = Number(totalCalories.toFixed(3));
                totalPrice = Number(totalPrice.toFixed(3));
              }

              return (
                <tr key={index}>
                  <td>{component.name}</td>
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
            })
          ) : (
            <tr>
              <td colSpan={8}>No search results found.</td>
            </tr>
          )}
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
