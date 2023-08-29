import { Button } from '@mui/material';
import useIngredientStore from '../../store/ingredientStore';
import {AiOutlinePlus} from 'react-icons/ai'
const AddIngredientButton = () => {
  const { setAddOpen } = useIngredientStore();

  return (
    <Button
      id='primary-button'
      variant='contained'
      type="submit"
      onClick={() => setAddOpen(true)}
      // style={{
      //   fontWeight: 'bold',
      //   scale: '80%'
      // }}
    >
      Add Ingredient &nbsp;
      <AiOutlinePlus       style={{
        scale: '150%'
      }}/>
    </Button>
  )
}

export default AddIngredientButton;