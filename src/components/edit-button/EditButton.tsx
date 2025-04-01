import React from "react";
import "./EditButton.scss";

interface Props {
  go: () => void | null;
}

const EtidButton: React.FC<Props> = ({ go }) => {
  return (
    <button className="button button--edit" onClick={go}>
      <img className="icon" src="src/assets/icons/outlined/edit.png" />
    </button>
  );
};

export default EtidButton;
