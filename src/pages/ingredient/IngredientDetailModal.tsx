import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts';
import { ICreateIngredientInput } from '../../interfaces/ingredient';
import { useState } from 'react';
import  useSelectedIngredientStore  from './selectedIngredientStore';
import EditIngredientDialog from './EditIngredientDialog';
// Modal Style
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

// Function Type
type MyFunctionType = () => void;

// Ingredient Detail Modal Props Interface
interface IIngredientDetailModalProps {
  open: boolean;
  handleClose: MyFunctionType;
  ingredient: null | ICreateIngredientInput;
}

const IngredientDetailModal: React.FC<IIngredientDetailModalProps> = (props) => {
  const [ingredients, setIngredients] = useState<ICreateIngredientInput[]>([]);
  const { selectedIngredient } = useSelectedIngredientStore();
  // const [selectedRow, setSelectedRow] = useState(null);

  let pieChartData: any = []

  if (props.ingredient) {
    pieChartData = [
      { name: 'Protein', value: Number(props.ingredient.protein), label: 'Protein' },
      { name: 'Carbs', value: Number(props.ingredient.carbs), label: 'Carbs' },
      { name: 'Fats', value: Number(props.ingredient.fats), label: 'Fats' },
    ];
  }

  // const handleIngredientUpdated = (updatedIngredient: ICreateIngredientInput) => {
  //   setIngredients((prevIngredients) => [...prevIngredients, updatedIngredient]);
  // }
  const handleIngredientUpdated = (updatedIngredient: ICreateIngredientInput) => {
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.id === updatedIngredient.id);
  
    // Create a copy of the existing ingredients array
    const updatedIngredients = [...ingredients];
  
    // Update the existing ingredient with the updated data
    updatedIngredients[ingredientIndex] = updatedIngredient;
  
    // Set the state with the modified list of ingredients
    setIngredients(updatedIngredients);
  };
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            {props.ingredient ? (
            <>
              {props.ingredient.name}
            </>
            ) : (
              null
            )}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            </Typography>

            <div style={{display: 'flex', flexDirection: 'row', height: '32vh'}}>
              <div style={{ width: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* <img src='https://freepngimg.com/download/apple/8-2-apple-fruit-transparent.png' alt='Apple' style={{scale: '50%'}}/> */}

                {props ? (
                  <>
                    <h3>Category</h3> {props.ingredient?.category} <br/>
                    <h3>Description</h3> {props.ingredient?.description}
                  </>
                ) : (
                  null
                )}
              </div>

              <PieChart
                series={[
                  {
                    data: pieChartData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 1,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                  },
                ]}
                height={260}
                width={370}
                margin={{bottom: -80}}
                tooltip={{ trigger: 'item' }}
              />
            </div>
            <EditIngredientDialog onIngredientUpdated={handleIngredientUpdated} ingredient={selectedIngredient} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default IngredientDetailModal;