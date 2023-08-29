import { Button } from '@mui/material';
import useComponentStore from '../../stores/componentStore';
import {AiOutlinePlus} from 'react-icons/ai'
const AddComponentButton = () => {
  const { setAddOpen } = useComponentStore();

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
      Add Component &nbsp;
      <AiOutlinePlus       style={{
        scale: '150%'
      }}/>
    </Button>
  )
}

export default AddComponentButton;