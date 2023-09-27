import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import * as ComponentApi from "../../network/componentApi";
import useEntityStore from "../../stores/entityStore";
import useIngredientStore from "../../stores/ingredientStore";
import useComponentStore from "../../stores/componentStore";
import { IComponent, IComponentIngredientDetails } from "../../interfaces";
import { useTheme } from "@mui/material/styles";
import useSearchStore from "../../stores/searchStore";
import { AiOutlineArrowDown } from "react-icons/ai";
import Grid from '@mui/material/Grid';

const DialogComponentTable: React.FC = () => {
  const { loading, setLoading } = useEntityStore();
  const { selectedIngredient, editData } = useIngredientStore();
  const { ingredientComponents, setIngredientComponents } = useComponentStore();
  const { setSearchResult } = useSearchStore();

  const theme = useTheme();

  async function loadComponents() {
    try {
      setSearchResult(false);
      setLoading(true);
      if (selectedIngredient) {
        const data = {
          skip: 0,
          take: 200,
          ingredient_id: selectedIngredient.id,
        };
        const response = await ComponentApi.fetchComponents(data);
        setIngredientComponents(response.data.components);
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
  }, []);

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
      <TableContainer
        sx={{
          maxHeight: 305,
          overflowX: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            maxHeight: '35vh',
            marginLeft: '20px',
            marginRight: '20px'
          }}
          justifyContent='center'
          alignContent='center'
        >
          <Table
            sx={{
              userSelect: "none",
            }}
            id="table"
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "white",
              }}
            >
              <tr>
                <th>Component Name&nbsp;</th>
                <th>Calories&nbsp;</th>
                <th>Protein&nbsp;</th>
                <th>Carbs&nbsp;</th>
                <th>Fat&nbsp;</th>
                <th>Unit&nbsp;</th>
                <th>Price&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {ingredientComponents &&
              Array.isArray(ingredientComponents) &&
              ingredientComponents.length > 0 ? (
                ingredientComponents.map(
                  (component: IComponent, index: number) => {
                    const data: IComponentIngredientDetails = {
                      ingredient_id: "",
                      calories: 0,
                      protein: 0,
                      carbs: 0,
                      fats: 0,
                      price: 0,
                      quantity: 0,
                    };
                    const newData: IComponentIngredientDetails = {
                      ingredient_id: "",
                      calories: editData.calories,
                      protein: editData.protein,
                      carbs: editData.carbs,
                      fats: editData.fats,
                      price: editData.price,
                      quantity: 0,
                    };
                    if (
                      component.components_ingredients &&
                      Array.isArray(component.components_ingredients)
                    ) {
                      component.components_ingredients.forEach((el) => {
                        data.ingredient_id = el.ingredient_id;
                        data.protein += Number(el.ingredient.protein);
                        data.carbs += Number(el.ingredient.carbs);
                        data.fats += Number(el.ingredient.fats);
                        data.price += Number(el.ingredient.price);
                        data.quantity += Number(el.ingredient_quantity);
                        if (
                          selectedIngredient &&
                          el.ingredient_id !== selectedIngredient.id
                        ) {
                          newData.protein += Number(el.ingredient.protein);
                          newData.carbs += Number(el.ingredient.carbs);
                          newData.fats += Number(el.ingredient.fats);
                          newData.price += Number(el.ingredient.price);
                          newData.quantity += Number(el.ingredient_quantity);
                        }
                      });
                      data.calories = Number(
                        data.protein * 4 + data.carbs * 4 + data.fats * 9
                      );
                      data.protein = Number(data.protein.toFixed(3));
                      data.carbs = Number(data.carbs.toFixed(3));
                      data.fats = Number(data.fats.toFixed(3));
                      data.calories = Number(data.calories.toFixed(3));
                      data.price = Number(data.price.toFixed(3));
                      newData.calories = Number(
                        newData.protein * 4 + newData.carbs * 4 + newData.fats * 9
                      );
                      newData.protein = Number((newData.protein.toFixed(3)));
                      newData.carbs = Number(newData.carbs.toFixed(3));
                      newData.fats = Number(newData.fats.toFixed(3));
                      newData.calories = Number(newData.calories.toFixed(3));
                      newData.price = Number(newData.price.toFixed(3));
                    }
                    return (
                      <tr key={index} style={{ height: "52px" }}>
                        <td>{component.name}</td>
                        <td
                        // style={{
                        //   color: selectedIngredient && editData.calories !==
                        //     ? theme.palette.primary.main
                        //     : 'inherit',
                        // }}
                        >
                          {(data.calories / data.quantity).toFixed(3)} <br />
                          <AiOutlineArrowDown />
                          <br />{" "}
                          {Number(
                            (newData.calories / (data.quantity)).toFixed(3)
                          )}
                        </td>
                        <td
                          style={{
                            color:
                              selectedIngredient &&
                              editData.protein !== selectedIngredient.protein
                                ? theme.palette.primary.main
                                : "inherit",
                          }}
                        >
                          {Number((data.protein / data.quantity).toFixed(3))}{" "}
                          <br />
                          <AiOutlineArrowDown />
                          <br />{" "}
                          {Number(
                            (newData.protein / data.quantity).toFixed(3)
                          )}
                        </td>
                        <td
                          style={{
                            color:
                              selectedIngredient &&
                              editData.carbs !== selectedIngredient.carbs
                                ? theme.palette.primary.main
                                : "inherit",
                          }}
                        >
                          {Number((data.carbs / data.quantity).toFixed(3))} <br />
                          <AiOutlineArrowDown />
                          <br />{" "}
                          {Number((newData.carbs / data.quantity).toFixed(3))}
                        </td>
                        <td
                          style={{
                            color:
                              selectedIngredient &&
                              editData.fats !== selectedIngredient.fats
                                ? theme.palette.primary.main
                                : "inherit",
                          }}
                        >
                          {Number((data.fats / data.quantity).toFixed(3))}
                          <br />
                          <AiOutlineArrowDown />
                          <br />{" "}
                          {Number((newData.fats / data.quantity).toFixed(3))}
                        </td>
                        <td>{component.unit}</td>
                        <td
                          style={{
                            color:
                              selectedIngredient &&
                              editData.price !== selectedIngredient.price
                                ? theme.palette.primary.main
                                : "inherit",
                          }}
                        >
                          {Number((data.price / data.quantity).toFixed(3))} <br />
                          <AiOutlineArrowDown />
                          <br />{" "}
                          {Number((newData.price / data.quantity).toFixed(3))}
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan={8}>No components found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Grid>
      </TableContainer>
    </>
  );
};

export default DialogComponentTable;