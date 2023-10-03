import { Button } from '@mui/material';
import {AiOutlinePlus} from 'react-icons/ai'
import useMealStore from '../../stores/mealStore';

const CreateMealButton: React.FC = () => {
  const { setAddOpen } = useMealStore();

  return (
    <Button
      id='primary-button'
      variant='contained'
      type="submit"
      onClick={() => setAddOpen(true)}
      style={{
        width: '100px',
        height: '56px'
      }}
    >
      Create &nbsp;
      <AiOutlinePlus
        style={{
        scale: '150%'
        }}
      />
    </Button>
  )
}

export default CreateMealButton;