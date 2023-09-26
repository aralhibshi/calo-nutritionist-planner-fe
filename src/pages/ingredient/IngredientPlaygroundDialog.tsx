import React from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import IngredientComponentTable from './IngredientComponentTable';
import { IIngredientData } from '../../interfaces';
import IngredientMealTable from './IngredientMealTable';
import { useTheme } from '@mui/material/styles';
import DialogComponentTable from './DialogComponentTable';
import Divider from '@mui/material/Divider';

interface IngredientPlaygroundDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const IngredientPlaygroundDialog: React.FC<IngredientPlaygroundDialogProps> = (props) => {
  const theme = useTheme();

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      fullScreen
    >
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '65px',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText
        }}
      >
        <Typography
          variant='h5'
          align='center'
          style={{
            margin: '16px 0'
          }}
        >
          Ingredient Playground
        </Typography>
      </Card>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 65px)'
        }}
      >
        <CardContent
          style={{
            flex: 1
          }}
        >
          <Grid
            container
            spacing={2}

          >
            {/* Section 1 */}
            <Grid
              item
              container
              xs={3}
              spacing={2}
              alignItems='center'
              maxHeight={'100vh'}
            >
              <Grid
                item 
                xs={12}
                alignItems='center'
                textAlign='center'
              >
                <Typography
                  variant='h6'
                >
                  Ingredient Name
                </Typography>
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                justifyContent='space-between'
              >
                <Grid
                  item
                  xs={2.5}
                >
                  <TextField
                    variant='outlined'
                    label='Price'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={2.5}
                >
                  <TextField
                    variant='outlined'
                    label='Protein'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={2.5}
                >
                  <TextField
                    variant='outlined'
                    label='Carbs'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={2.5}
                >
                  <TextField
                    variant='outlined'
                    label='Fats'
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
 
            {/* Section 2 */}

            <Grid
              item
              container
              xs={9}
              spacing={2}
              alignItems='center'
            >
              <Grid
                item
                xs={12}
                textAlign='center'
              >
                <Typography
                  variant='h6'
                >
                  Components
                </Typography>
              </Grid>
              <Grid
                item xs={12}
              >
                <DialogComponentTable/>
              </Grid>
              <Grid
                item xs={12}
              >
              </Grid>
              <Grid
                item
                xs={12}
                textAlign='center'
              >
                <Typography
                  variant='h6'
                >
                  Meals
                </Typography>
              </Grid>
              <Grid
                item xs={12}
              >
              <IngredientMealTable/>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Button
          variant='contained'
          onClick={handleClose}
          style={{
            alignSelf: 'flex-end',
            margin: '16px'
          }}
        >
          Close
        </Button>
      </Card>
    </Dialog>
  );
};

export default IngredientPlaygroundDialog;