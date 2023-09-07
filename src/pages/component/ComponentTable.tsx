import React, { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, IconButton } from "@mui/material";
import * as ComponentApi from "../../network/componentApi";
import useSearchStore from "../../stores/searchStore";
import { IComponent, IComponentData } from "../../interfaces";
import EditIcon from "@mui/icons-material/Edit";
import useComponentStore from "../../stores/componentStore";
import useEntityStore from "../../stores/entityStore";
import CreateComponentDialog from "./CreateComponentDialog";
import EditComponentDialog from "./EditComponentDialog";

const ComponentTable: React.FC = () => {
  const [components, setComponents] = useState<IComponentData[]>([]);
  const { selectedComponent, setSelectedComponent } = useComponentStore();
  const { setEntity } = useEntityStore();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { setEntityCount, skip } = useEntityStore();
  const { loading, setLoading, setSearchResult, searchResult } =
    useSearchStore();

  const memoizedSearchResult = useMemo(() => searchResult, [searchResult]);

  async function loadComponents() {
    try {
      setLoading(true);
      const data = {
        skip: skip,
        take: 9,
      };
      const response = await ComponentApi.fetchComponents(data);
      setEntityCount(response.data.count);
      setSearchResult(response.data.components);
      if (searchResult) {
        setComponents(searchResult);
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

  const handleComponentAdded = (newComponent: any) => {
    setComponents((prevComponents: any) => [...prevComponents, newComponent]);
  };

  const handleEditClick = (row: any) => {
    setSelectedComponent(row);
    setOpenEditDialog(true);
    setTimeout(() => {
    }, 0);
    setTimeout(() => {
      const barChart = document.querySelector(
        ".css-18ftw0b-MuiChartsSurface-root"
      );
      barChart?.setAttribute("viewBox", "0 15 400 280");
    }, 20);
  };

  const handleComponentUpdated = (updatedComponent: IComponentData) => {
    const updatedIndex = components.findIndex(
      (component) => component.id === updatedComponent.id
    );

    if (updatedIndex !== -1) {
      const updatedComponents = [...components];
      updatedComponents[updatedIndex] = updatedComponent;
      setComponents(updatedComponents);
    }

    setOpenEditDialog(false);
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
            <th>Component Name&nbsp;</th>
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
          memoizedSearchResult.length > 0 ? (
            memoizedSearchResult.map((component: IComponent, index: number) => {
              let totalFats = 0;
              let totalCarbs = 0;
              let totalProteins = 0;
              let totalCalories = 0;
              let totalPrice = 0;
              let totalQuantity = 0;

              if (
                component.components_ingredients &&
                Array.isArray(component.components_ingredients)
              ) {
                component.components_ingredients.forEach((el) => {
                  totalFats += Number(
                    el.ingredient.fats * el.ingredient_quantity
                  );
                  totalCarbs += Number(
                    el.ingredient.carbs * el.ingredient_quantity
                  );
                  totalProteins += Number(
                    el.ingredient.protein * el.ingredient_quantity
                  );
                  totalCalories +=
                    totalFats * 9 + totalCarbs * 4 + totalProteins * 4;
                  totalPrice += Number(
                    el.ingredient.price * el.ingredient_quantity
                  );
                  totalQuantity += Number(el.ingredient_quantity);
                });
              }

              return (
                <tr key={index} style={{ height: "52px" }}>
                  <td>{component.name}</td>
                  <td>{(totalCalories / totalQuantity).toFixed(3)}</td>
                  <td>{(totalProteins / totalQuantity).toFixed(3)}</td>
                  <td>{(totalCarbs / totalQuantity).toFixed(3)}</td>
                  <td>{(totalFats / totalQuantity).toFixed(3)}</td>
                  <td>{component.unit}</td>
                  <td>{(totalPrice / totalQuantity).toFixed(3)}</td>
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
      <EditComponentDialog
  key={selectedComponent?.id}
  open={openEditDialog}
  onClose={() => setOpenEditDialog(false)}
  onComponentUpdated={handleComponentUpdated}
  component={selectedComponent}
/>
      <CreateComponentDialog onComponentAdded={handleComponentAdded} />
    </>
  );
};

export default ComponentTable;
