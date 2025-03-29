import React from 'react';
import LogoBig from '../../components/logo-big/LogoBig';
import "./Home.scss";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return (
    <div className='page page--home'>
      <LogoBig />
    </div>
  );
};

export default Home;