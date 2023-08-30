import SearchBar from "../../components/search/SearchBar"
import ComponentTable from '../component/ComponentTable';
import SearchTypeDropdown from '../../components/search/SearchTypeDropdown';
import AddIngredientButton from '../ingredient/AddIngredientButton';
import useEntityStore from '../../stores/entityStore';
import IngredientTable from "../ingredient/IngredientTable";
import AddComponentButton from "../component/AddComponentButton";
import PaginationFooter from "../../components/footer/PaginationFooter";

const Home: React.FC = () => {
  const { entity } = useEntityStore();

  const entityTable = entity === 'ingredient'
  ? <IngredientTable/>
  : entity === 'component'
  ? <ComponentTable/>
  : entity === 'meal'
  ? null
  : null;

  const addEntityButton = entity === 'ingredient'
  ? <AddIngredientButton/>
  : entity === 'component'
  ? <AddComponentButton/>
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
      <div
        style={{
          position: "absolute",
          bottom: "2vh",
          width: "100%",
          textAlign: "center",
        }}
      >
        <PaginationFooter/>
      </div>
    </>
  );
};

export default Home;