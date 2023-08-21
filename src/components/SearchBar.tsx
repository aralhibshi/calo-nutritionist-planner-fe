import { Box, Container, InputAdornment, TextField } from "@mui/material";
import { useState, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  selectedValue: string;
}

export default function SearchBar({ selectedValue }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  let placeholderText = "Search Ingredient";

  if (selectedValue === "ingredient") {
    placeholderText = "Search Ingredients";
  } else if (selectedValue === "component") {
    placeholderText = "Search Components";
  } else if (selectedValue === "meal") {
    placeholderText = "Search Meals";
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <TextField
          id="search"
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
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
}