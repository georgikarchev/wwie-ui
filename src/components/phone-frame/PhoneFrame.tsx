import React from 'react';
import "./PhoneFrame.scss";

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <div className='phone-frame'>
      <div className='content-wrapper'>
        <div className='content'>{children}</div>
        <div className='background'></div>
      </div>
      <div className='camera-island'></div>
      <img src='src/assets/iphone-16.png' alt='device' className='device' />
    </div>
  );
};

export default PhoneFrame;