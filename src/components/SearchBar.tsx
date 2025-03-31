import React from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <TextField
      label="Search Borrower"
      variant="outlined"
      fullWidth
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: 20 }}
    />
  );
};

export default SearchBar;