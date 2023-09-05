import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import * as IngredientsApi from '../../network/ingredientApi';
import * as ComponentApi from '../../network/componentApi';
import * as MealApi from '../../network/mealApi';
import createError from 'http-errors';
import useSearchStore from "../../stores/searchStore";
import useEntityStore from "../../stores/entityStore";
import { IIngredientGetAPI } from "../../interfaces";

const ComponentSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entity] = useState('ingredient')
  const {
    setComponentLoading,
    setComponentSearchResult
  } = useSearchStore();
  const {
    setEntityCount,
    skip
  } = useEntityStore();

  const handleChange = (event: any) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };
  const searchItem = async (entity: string, data: IIngredientGetAPI) => {
    try {
      setComponentLoading(true);
      const entityToApiFunctionMap: any = {
        ingredient: IngredientsApi.fetchIngredients,
        component: ComponentApi.searchComponent,
        meal: MealApi.searchMeal,
      };
  
      const apiFunction: any = entityToApiFunctionMap[entity];
  
        const response = await apiFunction(data);
        setComponentSearchResult(response.data.ingredients);
        setEntityCount(response.count);
        console.log('entity', entity)
        setComponentLoading(false);
        // console.error(`No API function found for entity: ${entity}`);
    } catch (err) {
      throw createError(400, 'Bad Request', {
        details: `An error occurred while fetching matching ${entity}: ${err}`,
      });
    }
  };
  
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  
  const handleSubmit = () => {
    const data = {
      skip: skip,
      take: 200,
      name: undefined
    }

    searchItem(entity, data);
  }


  let placeholderText = "Search for an ingredient";
  if (entity === "ingredient") {
    placeholderText = "Search for an ingredient";
  }

  return (
    <TextField
    style={{
      width: "100%",
      display: "flex",
    }}
    label={searchTerm}
    value={searchTerm}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    placeholder={placeholderText}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
      },
    }}
    InputProps={{
      type: "search",
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon
            style={{
              cursor: 'pointer'
            }}
            onClick={() => handleSubmit()}
          />
        </InputAdornment>
      ),
    }}
      />
  );
}

export default ComponentSearchBar;