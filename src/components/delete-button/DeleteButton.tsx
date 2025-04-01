import React from "react";
import "./DeleteButton.scss";

interface Props {
  onClick: () => Promise<void> | null;
}

const DeleteButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className="button button--delete" onClick={onClick}>
      <img className="icon" src="src/assets/icons/outlined/backspace.png" />
    </button>
  );
};

export default DeleteButton;
