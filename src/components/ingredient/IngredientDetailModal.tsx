import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts';
import Tooltip from '@mui/material/Tooltip';

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

// Row Object Interface
interface IRowObjectInterface {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  price: number;
}

// Ingredient Detail Modal Props Interface
interface IIngredientDetailModalProps {
  open: boolean;
  handleClose: MyFunctionType;
  row: null | IRowObjectInterface;
}

const barChartsParams = {
  xAxis: [
    {
      data: ['page A', 'page B', 'page C', 'page D', 'page E'],
      scaleType: 'band' as const,
    },
  ],
  series: [
    { data: [2, 5, 3, 4, 1], stack: '1', label: 'series x' },
    { data: [10, 3, 1, 2, 10], stack: '1', label: 'series y' },
    { data: [10, 3, 1, 2, 10], stack: '1', label: 'series z' },
  ],
  margin: { top: 10, right: 10 },
  width: 400,
  height: 200,
};

const IngredientDetailModal: React.FC<IIngredientDetailModalProps> = (props) => {

  // Temporary data for the PieChart
  let pieChartData: any = []

  if (props.row) {
    pieChartData = [
      { name: 'Protein', value: props.row.protein, label: 'Protein' },
      { name: 'Carbs', value: props.row.carbs, label: 'Carbs' },
      { name: 'Fat', value: props.row.fat, label: 'Fat' },
    ];
  }

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
            {props.row ? <>{props.row.name}</> : null}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            </Typography>

            <div>
            <Tooltip title={props.row ? `Protein: ${props.row.protein}, Carbs: ${props.row.carbs}, Fat: ${props.row.fat}` : ''}>
                <PieChart
                  series={[
                    {
                      data: pieChartData,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 2,
                      cornerRadius: 5,
                      startAngle: 0,
                      endAngle: 360,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                  height={310}
                  width={400}
                  tooltip={{ trigger: 'item' }}
                />
              </Tooltip>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default IngredientDetailModal;