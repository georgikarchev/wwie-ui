import React from "react";
import "./Tag.scss";

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <span className="tag">{children}</span>;
};

export default Tag;
