import React from "react";
import "./Tag.scss";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const Tag: React.FC<Props> = ({ onClick = undefined, children }) => {
  return (
    <span className="tag" onClick={onClick}>
      {children}
    </span>
  );
};

export default Tag;
