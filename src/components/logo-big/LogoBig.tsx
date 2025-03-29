import React from 'react';
import "./LogoBig.scss";

interface Props {onClick?: () => void}

const ComponentName: React.FC<Props> = ({onClick}) => {
  return (
    <div className='logo-big'>
      <img src='./src/assets/wwie-logo-big.png' alt='What Will I Eat Logo' />
    </div>
  );
};

export default ComponentName;