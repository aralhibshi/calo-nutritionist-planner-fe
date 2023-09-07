// React
import { useEffect, useState } from 'react';

// Material UI
import { Typography } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';

// Components
import SearchTypeDropdown from '../../components/search/SearchTypeDropdown';
import SearchBar from "../../components/search/SearchBar"
import PaginationFooter from "../../components/footer/PaginationFooter";

// Pages
import CreateIngredientButton from '../ingredient/CreateIngredientButton';
import CreateComponentButton from '../component/CreateComponentButton';
import CreateMealButton from "../meal/CreateMealButton";
import IngredientTable from "../ingredient/IngredientTable";
import ComponentTable from '../component/ComponentTable';
import MealTable from "../meal/MealTable";

// Stores
import useEntityStore from '../../stores/entityStore';
import useNotificationStore from '../../stores/notificationStore';

interface State extends SnackbarOrigin {
  open: boolean;
}


const Home: React.FC = () => {
  const {
    entity
  } = useEntityStore();
  const {
    notify,
    setNotify,
    message
  } = useNotificationStore();

  useEffect(() => {
    setNotify(false);
  }, [])

  const entityTable = entity === 'ingredient'
  ? <IngredientTable/>
  : entity === 'component'
  ? <ComponentTable/>
  : entity === 'meal'
  ? <MealTable/>
  : null;

  const addEntityButton = entity === 'ingredient'
  ? <CreateIngredientButton/>
  : entity === 'component'
  ? <CreateComponentButton/>
  : entity === 'meal'
  ? <CreateMealButton/>
  : null;

  function entityString(entity: string) {
    return entity.charAt(0).toUpperCase() + entity.slice(1) + 's'
  }

  return (
    <>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: '79px',
          marginBottom: '15px'
          }}
        >
          <SearchTypeDropdown/>
          <Typography
            variant="h3"
            component="h2"
            style={{fontSize: '40px'}}
            >
            { entityString(entity) }
          </Typography>
          { addEntityButton }
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: 'auto'
          }}
        >
        <SearchBar/>
        </div>
      { entityTable }
      <PaginationFooter/>
      <Grid>
        <Snackbar
          open={notify}
          onClose={() => {
            setNotify(false)
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          message={message}
          autoHideDuration={3000}
          color="primary"
        />
      </Grid>
    </>
  );
};

export default Home;