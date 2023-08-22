import React, { useState } from 'react';
import ColorToggleButton from "../components/search/SearchToggleButton"
import SearchBar from "../components/search/SearchBar"

import imageSrc from '../resources/logo.png'; 

const Home = () => {
  const [selectedValue, setSelectedValue] = useState('ingredient');

  const handleAlignmentChange = (newAlignment: string) => {
    setSelectedValue(newAlignment);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
        <img src={imageSrc} alt="Logo" style={{ maxWidth: '200px' }} /> {/* Add the image above the search bar */}
      </div>
      <ColorToggleButton
        selectedValue={selectedValue}
        onAlignmentChange={handleAlignmentChange}
      />
      <SearchBar selectedValue={selectedValue} />
    </div>
  );
};

export default Home;