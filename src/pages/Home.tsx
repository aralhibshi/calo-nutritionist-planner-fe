import React, { useState } from 'react';
import ColorToggleButton from "../components/search/SearchToggleButton"
import SearchBar from "../components/search/SearchBar"

const Home = () => {
  const [selectedValue, setSelectedValue] = useState('ingredient');

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