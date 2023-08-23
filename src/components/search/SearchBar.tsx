import { Box, Container, InputAdornment, TextField } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from '@mui/material/Autocomplete';
import * as IngredientsApi from '../../network/ingredient_api';
import { IIngredient } from "../../interfaces/ingredient";
import createError from 'http-errors';

interface SearchBarProps {
  selectedValue: string;
}

export default function SearchBar({ selectedValue }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchEntity, setSearchEntity] = useState('ingredient');
  const [searching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult]: any = useState([]);

  useEffect(() => {
    if (searching) {
      searchItem(searchTerm, searchEntity);
    }
  }, [searchTerm])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    if (event.target.value) {
      setSearchTerm(event.target.value);
      setIsSearching(true);
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

  const films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 }
  ]

  return (
    <Container maxWidth="md">

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Autocomplete
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
                  borderRadius: "20px",
                },
                width: 800,
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
      </Box>
    </Container>
  );
}