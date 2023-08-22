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

  let placeholderText = "Search for an ingredient";

  if (selectedValue === "ingredient") {
    placeholderText = "Search for an ingredient";
  } else if (selectedValue === "component") {
    placeholderText = "Search for a component";
  } else if (selectedValue === "meal") {
    placeholderText = "Search for a meal";
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