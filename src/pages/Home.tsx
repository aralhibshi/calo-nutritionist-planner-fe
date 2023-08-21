import React, { useState } from 'react';
import ColorToggleButton from "../components/SearchToggleButton"
import SearchBar from "../components/SearchBar"

const Home = () => {
  const [selectedValue, setSelectedValue] = useState("web");

  const handleAlignmentChange = (newAlignment: string) => {
    setSelectedValue(newAlignment);
  };

  return (
    <div>
      <ColorToggleButton
        selectedValue={selectedValue}
        onAlignmentChange={handleAlignmentChange}
      />
      <SearchBar selectedValue={selectedValue} />
    </div>
  );
};

export default Home;