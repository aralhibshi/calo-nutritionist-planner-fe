import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import {AiOutlinePlus} from 'react-icons/ai'
import useComponentStore from '../../stores/componentStore';

const CreateComponentButton: React.FC = () => {
  const { setAddOpen } = useComponentStore();

  return (
      <Button
      id='primary-button'
      variant='contained'
      type="submit"
      onClick={() => setAddOpen(true)}
      style={{
        width: '100%',
        height: '100%'
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

export default CreateComponentButton;