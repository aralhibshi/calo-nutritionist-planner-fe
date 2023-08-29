import React, { useState } from 'react';
import SearchBar from "../../components/search/SearchBar"
import ComponentTable from '../component/ComponentTable';
import SearchTypeDropdown from '../../components/search/SearchTypeDropdown';
import AddIngredientButton from '../ingredient/AddIngredientButton';
import useSearchStore from '../../store/searchStore';

const Home = () => {
  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: '20px',
        marginBottom: '10px'
        }}
      >
        <SearchTypeDropdown/>
        <AddIngredientButton/>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: 'auto'
        }}
      >
      <SearchBar/>
      </div>
      <ComponentTable/>
    </>
  );
};

export default Home;