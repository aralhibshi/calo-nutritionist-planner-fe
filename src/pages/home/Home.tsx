import React, { useState } from 'react';
import SearchBar from "../../components/search/SearchBar"
import IngredientTable from '../ingredient/IngredientTable';
import SearchTypeDropdown from '../../components/search/SearchToggleButton';

const Home = () => {
  const [selectedValue, setSelectedValue] = useState('ingredient');

  return (
    <div style={{
      marginLeft: '32px',
      marginRight: '32px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '20px',  }}>
        <SearchTypeDropdown
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
        />
      </div>
      <SearchBar selectedValue={selectedValue} />
    <IngredientTable/>
    </div>
  );
};

export default Home;