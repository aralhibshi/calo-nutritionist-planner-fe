import { Box, Container, InputAdornment, TextField } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from '@mui/material/Autocomplete';
import * as IngredientsApi from '../../network/ingredientApi';
import createError from 'http-errors';

interface SearchBarProps {
  selectedValue: string;
}

export default function SearchBar({ selectedValue }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchEntity, setSearchEntity] = useState('ingredient');
  const [searching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult]: any = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searching) {
        searchItem(debouncedSearchTerm, searchEntity);
      }
    }, 400);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [debouncedSearchTerm, searchEntity, searching]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm) {
      setIsSearching(true);
      setDebouncedSearchTerm(newSearchTerm);
    } else {
      setIsSearching(false);
    }
  };

  const searchItem = async (index: string, entity: string) => {
    try {
      const response = await IngredientsApi.searchIngredient(index, entity);
      setSearchResult(response);
      console.log(response);
    } catch (err) {
      throw createError(400, 'Bad Request', {
        details: 'An error occurred while fetching matching ingredient:', err
      });
    }
  }

  let placeholderText = "Search for an ingredient";

  if (selectedValue === "ingredient") {
    placeholderText = "Search for an ingredient";
  } else if (selectedValue === "component") {
    placeholderText = "Search for a component";
  } else if (selectedValue === "meal") {
    placeholderText = "Search for a meal";
  }

  return (
    <Autocomplete
      style={{
        width: '100%',
        display: 'flex'
      }}
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={searchResult.length > 0 ? searchResult.map((result: any) => result.name): []}
      renderInput={(params) => (
        <TextField
          {...params}
          label={searchTerm}
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholderText}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            }
          }}
          InputProps={{
            ...searching ? {
              ...params.InputProps,
            } : {
            },
            type: 'search',
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
}