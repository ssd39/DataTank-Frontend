import React from 'react';
import AnimatedButton from '../Components/AnimatedButton';
import AnimatedTitle from '../Components/AnimatedTitle';
import Brush from '../Components/BackgroundBrush';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App" className="flex flex-1 flex-col">
      <div className='flex justify-end py-5 mx-3'>
        <AnimatedButton onClickCB={()=>{
            setTimeout(()=>{
              navigate('/dashboard');
            },1000)
        }}/>
      </div>
      <div className='absolute flex w-full' style={{top: "40%"}}>
          <div className='flex-1'></div>
          <AnimatedTitle  />
          <div className='flex-1'></div>
      </div>
      <Brush />
    </div>
  );
}

export default Home;
