import React from 'react'
import { ScaleLoader } from 'react-spinners';

const ButtonLoader = () => {
  return (
    <div>
      <ScaleLoader 
        size={50}
        color="rgba(30,215,96,1)"
      />
    </div>
  );
}

export default ButtonLoader