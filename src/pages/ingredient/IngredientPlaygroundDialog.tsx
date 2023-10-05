import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTheme } from '@mui/material/styles';
import DialogComponentTable from './DialogComponentTable';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import LinearProgress from '@mui/material/LinearProgress';
import useIngredientStore from '../../stores/ingredientStore';
import useComponentStore from '../../stores/componentStore';
import DialogMealTable from './DialogMealTable';
import { PiHamburgerBold } from 'react-icons/pi';
import { MdOutlineFastfood } from 'react-icons/md'
import Tooltip from '@mui/material/Tooltip';

interface IngredientPlaygroundDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  calculateData: (useCase:string, data: any) => void;
  formattedCalories: () => number;
  progressColor: () => 'error' | 'primary' | 'warning' | undefined;
  sliderColor: () => string | undefined;
}

const IngredientPlaygroundDialog: React.FC<IngredientPlaygroundDialogProps> = ({
  open,
  setOpen,
  calculateData,
  formattedCalories,
  progressColor,
  sliderColor
}) => {
  const {
    selectedIngredient,
    editData,
    setEditData
  } = useIngredientStore();
  const {
    setSelectedComponent
  } = useComponentStore()

  const theme = useTheme();

  const handleDecimalChange = (e: any) => {
    const data: any = { ...editData };
    data[e.target.name] = e.target.value;
    console.log(editData.totalUnit);

    calculateData('decimalChange', data);
  };

  const handleTextfieldChange = (e: any) => {
    const { value, name } = e.target;
    setEditData({ ...editData, [name]: Number(value) });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedComponent(null);
  };

  return (
    <Dialog
      open={open}
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
        <CardContent>
          <Grid
            container
            spacing={1}
            height={'calc(98vh - 65px)'}
            marginLeft={0}
            padding={0}
          >

            {/* Section 1 */}

            <Grid
              item
              container
              xs={3.1}
              alignItems='center'
              spacing={2}
              justifyContent='space-between'
              paddingLeft={0}
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
                  {selectedIngredient?.name}
                </Typography>
              </Grid>

              <Tooltip
                title='Read-Only'
                followCursor
              >
                <Grid
                  item
                  container
                  spacing={1}
                >
                  <Grid
                    item
                    xs={6}
                  >
                    <TextField
                      variant='outlined'
                      label='Category'
                      value={selectedIngredient?.category}
                      fullWidth
                
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
                      value={
                        selectedIngredient?.unit === 'g' ? 'Grams' : selectedIngredient?.unit === 'ml' ? 'Milliliters' : null
                      }
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
              </Tooltip>

              <Tooltip
                title='Read-Only'
                followCursor
              >
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    variant='outlined'
                    label='Description'
                    value={selectedIngredient?.description}
                    fullWidth
                    disabled
                  />
                </Grid>
              </Tooltip>

              <Grid
                item
                xs={12}
              >
                <Divider
                  orientation='horizontal'
                />
              </Grid>
              
              {/* Before Values */}

              <Tooltip
                title='Read-Only'
                followCursor
              >
                <Grid
                  item
                  container
                  xs={12}
                  spacing={1}
                >
                  <Grid
                    item
                    xs={3}
                  >
                    <TextField
                      variant='outlined'
                      label='Price'
                      value={selectedIngredient?.price}
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
                      value={selectedIngredient?.protein}
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
                      value={selectedIngredient?.carbs}
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
                      value={selectedIngredient?.fats}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Tooltip>

              {/* Downward Arrows */}

              <Grid
                item
                container
                xs={12}
              >
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                >
                  <ArrowDownwardIcon
                    color='disabled'
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                >
                  <ArrowDownwardIcon
                    color='disabled'
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                >
                  <ArrowDownwardIcon
                    color='disabled'
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  textAlign='center'
                >
                  <ArrowDownwardIcon
                    color='disabled'
                    sx={{
                      fontSize: 28
                    }}
                  />
                </Grid>
              </Grid>

              {/* After Values */}

              <Grid
                item
                container
                xs={12}
                spacing={1}
              >
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Price'
                    name='price'
                    value={editData.price || ''}
                    type='number'
                    onChange={handleTextfieldChange}
                    inputProps={{
                      min: 0,
                      max: 0.999,
                      step: 0.001
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Protein'
                    name='protein'
                    value={editData.protein || ''}
                    type='number'
                    onChange={handleTextfieldChange}
                    inputProps={{
                      min: 0,
                      max: 0.999,
                      step: 0.001
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Carbs'
                    name='carbs'
                    value={editData.carbs || ''}
                    type='number'
                    onChange={handleTextfieldChange}
                    inputProps={{
                      min: 0,
                      max: 0.999,
                      step: 0.001
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                >
                  <TextField
                    variant='outlined'
                    label='Fats'
                    name='fats'
                    value={editData.fats || ''}
                    type='number'
                    onChange={handleTextfieldChange}
                    inputProps={{
                      min: 0,
                      max: 0.999,
                      step: 0.001
                    }}
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
                xs={12}
                spacing={1}
              >
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
                    defaultValue={Number(selectedIngredient?.price)}
                    value={Number(editData.price)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
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
                    sx={{
                      color: sliderColor()
                    }}
                    name='protein'
                    defaultValue={Number(selectedIngredient?.protein)}
                    value={Number(editData.protein)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
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
                    sx={{
                      color: sliderColor()
                    }}
                    name='carbs'
                    defaultValue={Number(selectedIngredient?.carbs)}
                    value={Number(editData.carbs)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
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
                    sx={{
                      color: sliderColor()
                    }}
                    name='fats'
                    defaultValue={Number(selectedIngredient?.fats)}
                    value={Number(editData.fats)}
                    max={0.999}
                    step={0.001}
                    onChange={handleDecimalChange}
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
                spacing={1}
                xs={12}
                alignItems='center'
              >
                <Tooltip
                  title='Read-Only'
                  followCursor
                >
                  <Grid
                    item
                    xs={3}
                  >
                    <TextField
                      variant='outlined'
                      label='Total'
                      value={editData.totalUnit}
                      disabled
                    />
                  </Grid>
                </Tooltip>

                <Tooltip
                  title='Read-Only'
                  followCursor
                >
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
                </Tooltip>

                <Tooltip
                    title='Caloric Density of Ingredient'
                    followCursor
                >
                  <Grid
                    item
                    xs={6}
                  >
                    <Typography
                      variant="body1"
                      fontSize={'15px'}
                      textAlign='center'
                      sx={{
                        cursor: 'default'
                      }}
                    >
                      Calorie Rating
                    </Typography>
                    <LinearProgress
                      color={progressColor()}
                      aria-label="Calorie"
                      sx={{
                        width: '100%',
                        color: 'blue',
                      }}
                      variant="determinate"
                      value={formattedCalories()}
                    />
                  </Grid>
                </Tooltip>
              </Grid>
            </Grid>

            {/* Vertical Divider */}

            <Grid
              item
              xs={0.15}
              height={'100%'}
            >
              <Divider
                orientation='vertical'
              />
            </Grid>
            
            {/* Section 2 */}

            <Grid
              item
              container
              xs={8.7}
              spacing={1}
              marginRight={'auto'}
            >
              <Grid
                item
                xs={12}
                textAlign='center'
              >
                <Typography
                  variant='h6'
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  Components
                  <PiHamburgerBold
                    style={{
                      marginRight: '0.5 rem',
                      translate: '0 -0.05rem',
                      marginLeft: '0.1rem'
                    }}
                  />
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <DialogComponentTable/>
              </Grid>
              <Grid
                item
                xs={12}
                margin={'0 15px 0 15px'}
              >
                <Divider
                  orientation='horizontal'
                />
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
                  <MdOutlineFastfood
                    style={{
                      translate: '0 0.05rem',
                      marginLeft: '0.1rem'
                    }}
                  />
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
              >
              <DialogMealTable/>
              </Grid>
              <Grid
                item
                xs={12}
                textAlign='right'
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
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
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default IngredientPlaygroundDialog;