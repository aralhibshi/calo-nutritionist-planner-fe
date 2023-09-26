import React from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IIngredientData } from '../../interfaces';
import IngredientMealTable from './IngredientMealTable';
import { useTheme } from '@mui/material/styles';
import DialogComponentTable from './DialogComponentTable';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import LinearProgress from '@mui/material/LinearProgress';

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
            spacing={1}
          >
            {/* Section 1 */}
            <Grid
              item
              container
              xs={3}
              alignItems='center'
              maxHeight={'100vh'}
              spacing={1.9}
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
                  xs={6}
                >
                  <TextField
                    variant='outlined'
                    label='Category'
                    value='Carbs'
                    disabled
                  />
                </Grid>

                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    variant='outlined'
                    label='Unit'
                    value='Milliliters'
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  variant='outlined'
                  label='Description'
                  value='Blah Blah Blah'
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid
                item
                xs={12}
              >
                <Divider
                  orientation='horizontal'
                />
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                justifyContent='space-between'
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Price'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Protein'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Carbs'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Fats'
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                justifyContent='space-between'
                alignContent='center'
              >
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                  // color={'GrayText'}
                  color= {theme.palette.primary.main}
                >
                  <ArrowDownwardIcon
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                  // color={'GrayText'}
                  color= {theme.palette.primary.main}
                >
                  <ArrowDownwardIcon
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                  // color={'GrayText'}
                  color= {theme.palette.primary.main}
                >
                  <ArrowDownwardIcon
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                  // color={'GrayText'}
                  color= {theme.palette.primary.main}
                >
                  <ArrowDownwardIcon
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                justifyContent='space-between'
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Price'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Protein'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Carbs'
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Fats'
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Divider
                  orientation='horizontal'
                />
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                justifyContent='space-between'
                spacing={1}
              >
                {/* <Grid
                  item
                  xs={12}
                  textAlign='center'
                >
                  <Typography
                    variant='h6'
                  >
                    Edit
                  </Typography>       
                </Grid> */}
                <Grid
                  item
                  xs={3}
                >
                  <Typography
                    variant='h6'
                  >
                    Price
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                  <Slider
                    name='price'
                    // defaultValue={Number(selectedIngredient?.price)}
                    defaultValue={0}
                    max={0.999}
                    step={0.001}
                    // onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                justifyContent='space-between'
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <Typography
                    variant='h6'
                  >
                    Protein
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                  <Slider
                    name='Protein'
                    // defaultValue={Number(selectedIngredient?.price)}
                    defaultValue={0}
                    max={0.999}
                    step={0.001}
                    // onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                justifyContent='space-between'
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <Typography
                    variant='h6'
                  >
                    Carbs
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                  <Slider
                    name='carbs'
                    // defaultValue={Number(selectedIngredient?.price)}
                    defaultValue={0}
                    max={0.999}
                    step={0.001}
                    // onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                justifyContent='space-between'
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <Typography
                    variant='h6'
                  >
                    Fats
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                  <Slider
                    name='fats'
                    // defaultValue={Number(selectedIngredient?.price)}
                    defaultValue={0}
                    max={0.999}
                    step={0.001}
                    // onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Divider
                  orientation='horizontal'
                />
              </Grid>
              <Grid
                item
                container
                flexDirection='row'
                alignContent='center'
                alignItems='center'
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Total'
                    value={1}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Calories'
                    value={3.537}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <Typography
                    variant="body1"
                    fontSize={'15px'}
                    textAlign='center'
                  >
                    Calorie Rating
                  </Typography>
                  <LinearProgress
                    // color={progressColor()}
                    color={'primary'}
                    aria-label="Calorie"
                    sx={{
                      width: '100%',
                      color: 'blue',
                    }}
                    variant="determinate"
                    value={70}
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