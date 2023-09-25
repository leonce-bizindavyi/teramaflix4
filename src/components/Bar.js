import  React,{useState,useEffect,useContext} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { purple } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import { LoadContext } from './context/loading';
export default function LinearIndeterminate() {
  const {loaded} = useContext(LoadContext)
  const [load, setLoad] = useState(true)
  useEffect(() => {
    console.log(loaded)
    setLoad(loaded)
  }, [loaded])
  
  return (
    <>
    {!load ? <div className=''>
      <Box sx={{ width: '100%' }}>
        <LinearProgress color="secondary" sx={{ color: purple[500], backgroundColor: blue[500] }} className='h-[0.2rem] w-full' />
      </Box>
    </div>:null}
    </>
  );
}