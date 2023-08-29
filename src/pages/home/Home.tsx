import SearchBar from "../../components/search/SearchBar"
import IngredientTable from '../ingredient/IngredientTable';
import SearchTypeDropdown from '../../components/search/SearchTypeDropdown';
import AddIngredientButton from '../ingredient/AddIngredientButton';
import useEntityStore from '../../stores/entityStore';

const Home = () => {
  const { entity } = useEntityStore();

  const entityTable = entity === 'ingredient'
  ? <IngredientTable/>
  : entity === 'component'
  ? null
  : entity === 'meal'
  ? null
  : null;

  const addEntityButton = entity === 'ingredient'
  ? <AddIngredientButton/>
  : entity === 'component'
  ? null
  : entity === 'meal'
  ? null
  : null;

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
        { addEntityButton }
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
      { entityTable }
    </>
  );
};

export default Home;