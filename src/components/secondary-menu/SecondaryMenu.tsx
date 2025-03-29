import React from 'react';
import "./SecondaryMenu.scss";

interface Props {setPage: React.Dispatch<React.SetStateAction<string>>}

const SecondaryMenu: React.FC<Props> = ({setPage}) => {
  const go = (to: string) => setPage(to);

  const goProfile = () => go("profile");

  return (
    <div className='secondary-menu'>
      <button className='button' onClick={goProfile}>
        <img className='icon' src='src/assets/icons/outlined/person.png' />
      </button>
    </div>
  );
};

export default SecondaryMenu;