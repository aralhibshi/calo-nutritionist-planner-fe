import React, { useState } from 'react';
import SearchBar from "../../components/search/SearchBar"
import IngredientTable from '../ingredient/IngredientTable';
import SearchTypeDropdown from '../../components/search/SearchToggleButton';

const Home = () => {
  const [selectedValue, setSelectedValue] = useState('ingredient');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
    }}>
      <div style={{ marginBottom: '10px' }}>
        <SearchTypeDropdown
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <SearchBar selectedValue={selectedValue} />
      </div>
      <IngredientTable />
    </div>
  );
};

export default Home;