import React from 'react';
import AnimatedButton from '../Components/AnimatedButton';
import AnimatedTitle from '../Components/AnimatedTitle';
import Brush from '../Components/BackgroundBrush';

function Home() {
  return (
    <div className="App" className="flex flex-1 flex-col">
      <div className='flex justify-end py-5 mx-3'>
        <AnimatedButton />
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
