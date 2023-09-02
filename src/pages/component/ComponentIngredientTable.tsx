  import React, { useEffect, useState } from "react";
  import Table from "@mui/material/Table";
  import TableContainer from '@mui/material/TableContainer';
  import CircularProgress from "@mui/material/CircularProgress";
  import { Backdrop } from "@mui/material";
  import * as IngredientsApi from "../../network/ingredientApi";
  import useIngredientStore from "../../stores/ingredientStore";
  import useSearchStore from "../../stores/searchStore";
  import {
    IComponentIngredient,
    IIngredient,
    IComponentIngredientDataArray,
  } from "../../interfaces";
  import useEntityStore from "../../stores/entityStore";

  interface ComponentIngredientTableProps {}

  const ComponentIngredientTable: React.FC<
    ComponentIngredientTableProps
  > = () => {
    const [ingredients, setIngredients] = useState<IComponentIngredient[]>([]);
    const [quantity, setQuantity] = useState(1)
    const {
      componentLoading,
      setComponentLoading,
      componentSearchResult,
      setComponentSearchResult,
    } = useSearchStore();
    const { setEntityCount, skip } = useEntityStore();
    const { selectedIngredients, setSelectedIngredients } = useIngredientStore();

    async function loadIngredients() {
      try {
        setComponentLoading(true);
        const take = 100;
        const response = await IngredientsApi.fetchIngredients(0, take);
        setEntityCount(response.count);
        setComponentSearchResult(response.data);
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

    // const handleQuantityChange = (
    //   ingredient: IComponentIngredient,
    //   quantity: number
    // ) => {
    //   const updatedIngredient: IComponentIngredient = {
    //     ...ingredient,
    //     ingredient_quantity: quantity,
    //   };

    //   const updatedIngredients = [...selectedIngredients];
    //   const existingIndex = updatedIngredients.findIndex(
    //     (item) => item.id === updatedIngredient.id
    //   );
    //   if (existingIndex !== -1) {
    //     updatedIngredients[existingIndex] = updatedIngredient;
    //   } else {
    //     updatedIngredients.push(updatedIngredient);
    //   }

    //   setSelectedIngredients(updatedIngredients);
    // };

    const handleSelectClick = (row: any) => {
      const updatedSelectedIngredients: any = [...selectedIngredients];
      const ingredientIndex = updatedSelectedIngredients.findIndex(
        (ingredient: any) => ingredient.id === row.id
      );

      if (ingredientIndex !== -1) {
        updatedSelectedIngredients.splice(ingredientIndex, 1);
      } else {
        updatedSelectedIngredients.push({
          ingredient_id: row.id,
          ingredient_quantity: quantity
        });
      }

      setSelectedIngredients(updatedSelectedIngredients);
      console.log("selected ingredients", updatedSelectedIngredients);
    };

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
        <div style={{
          marginTop: '12px',
          overflowY: "auto",
          maxHeight: "400px",
          width: '100%'
          }}
        >
          <TableContainer>
            <Table
              stickyHeader
              sx={{
                userSelect: "none",
                width: '100%',
              }}
              id="table"
            >
              <thead>
                <tr>
                  <th>Ingredient Name&nbsp;</th>
                  <th>Quantity</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {componentSearchResult &&
                Array.isArray(componentSearchResult) &&
                componentSearchResult.length > 0 ? (
                  componentSearchResult.map(
                    (ingredient: IComponentIngredient, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{ingredient.name}</td>
                          {/* <td>
                            <input
                              type="number"
                              min="0"
                              value={
                                selectedIngredients.find(
                                  (item) => item.id === ingredient.id
                                )?.ingredient_quantity || ""
                              }
                              onChange={(e) =>
                                handleQuantityChange(
                                  ingredient,
                                  parseInt(e.target.value, 10)
                                )
                              }
                              style={{ width: "50px" }} // Adjust the width here
                            />
                          </td> */}
                          <td>
                            <input
                              type="number"
                              style={{
                                width: '50px'
                              }}
                            />
                          </td>
                          <td>
                            <input
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

  export default ComponentIngredientTable;
