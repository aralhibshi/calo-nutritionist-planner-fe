// React
import React from 'react';
import { useEffect, useState } from 'react';

// Material UI
import { Typography } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import { Button } from '@mui/material';

import {BiExport} from 'react-icons/bi'

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
import useUserStore from '../../stores/userStore';
import useEntityStore from '../../stores/entityStore';
import useNotificationStore from '../../stores/notificationStore';

// React Icons
import { TbMeat } from "react-icons/tb";
import { PiHamburgerBold } from 'react-icons/pi';
import { MdOutlineFastfood } from 'react-icons/md'


// APIs
import * as ExportApi from '../../network/exportApi';

// Utils
import { capitalizeFirstLetter } from '../../utils/stringUtils';

const Home: React.FC = () => {
  const {
    storeUser
  } = useUserStore()
  const {
    entity,
    setLoading
  } = useEntityStore();
  const {
    notify,
    setNotify,
    message,
    setMessage
  } = useNotificationStore();

  const [ data, setData ] = useState({
    user_id: 1,
    user_email: 'a.alhibshi@calo.app',
    email_type: 'data-report',
    skip: 0,
    take: 500
  })

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

  const addEntityButton
  = entity === 'ingredient'
  ? <CreateIngredientButton/>
  : entity === 'component'
  ? <CreateComponentButton/>
  : entity === 'meal'
  ? <CreateMealButton/>
  : null;

  function entityString(entity: string) {
    return entity.charAt(0).toUpperCase() + entity.slice(1) + 's'
  }

  const entityIcon
  = entity === 'ingredient'
  ? <TbMeat
      style={{
        translate: '0 -0.2rem',
        marginLeft: '0.3rem'
      }}
  />
  : entity === 'component'
  ? <PiHamburgerBold
      style={{
        translate: '0 -0.1rem',
        marginLeft: '0.3rem'
      }}
    />
  : entity === 'meal'
  ? <MdOutlineFastfood
    style={{
      translate: '0 -0.4rem',
      marginLeft: '0.3rem',
    }}
    />
  : null;

  async function exportData() {

    setLoading(true);
    await ExportApi.exportData(storeUser, entity, data);
    setLoading(false);
    setNotify(true);
    setMessage(`${capitalizeFirstLetter(entity)}s Exported`)
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
            variant="h6"
            component="h3"
            style={{
              fontSize: '40px',
              marginLeft:'60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '-10px'
            }}
            >
            { entityString(entity) }
            { entityIcon }
          </Typography>
          <div>
          <Button
            id='primary-button'
            variant='outlined'
            type="submit"
            onClick={() => exportData()}
            style={{
              width: '131px',
              height: '56px',
              marginRight: '10px'
            }}
          >
            Export &nbsp;
            <BiExport/>

          </Button>
          { addEntityButton }
          </div>
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