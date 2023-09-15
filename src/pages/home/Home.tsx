// React
import React from 'react';
import { useEffect } from 'react';

// Material UI
import { Typography } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';

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
import MealImageUploader from '../meal/MealImageUploader';

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

  const theme = useTheme();

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

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
      <MealImageUploader/>
      <Grid>
        <Snackbar
          open={notify}
          onClose={() => {
            setNotify(false)
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          message={message}
          autoHideDuration={4000}
          transitionDuration={{
            enter: 1500,
            exit: 1500
          }}
          color="primary"
        >
          <Alert
            severity="success"
            sx={{
              width: '100%',
            }}
            style={{
              backgroundColor: theme.palette.primary.main
            }}
          >
            { message }
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default Home;