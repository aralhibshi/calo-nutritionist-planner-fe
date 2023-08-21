import { Box, Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
        <TextField
          id="search"
          label="Search"
          value={searchTerm}
          onChange={handleChange}
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