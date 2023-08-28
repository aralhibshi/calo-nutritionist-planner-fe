import React, { useState } from 'react';
import SearchBar from "../../components/search/SearchBar"
import IngredientTable from '../ingredient/IngredientTable';
import SearchTypeDropdown from '../../components/search/SearchToggleButton';
import AddIngredientButton from '../ingredient/AddIngredientButton';

const Home = () => {
  const [selectedValue, setSelectedValue] = useState('ingredient');

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'left',
        alignContent: 'center',
        marginTop: '20px',
        marginBottom: '10px'
        }}
      >
        <SearchTypeDropdown
          setSelectedValue={setSelectedValue}
          selectedValue={selectedValue}
        />
        <AddIngredientButton/>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        }}
      >
      <SearchBar
        selectedValue={selectedValue}
      />
      </div>
      
    <IngredientTable/>
    </>
  );
};

export default Home;