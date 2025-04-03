import React from "react";
import Tag from "../tag/Tag";
import "./MakeAdminButton.scss";

interface Props {
  onClick: () => void;
}

const MakeAdminButton: React.FC<Props> = ({ onClick }) => {
  return <Tag onClick={onClick}>make admin</Tag>;
};

export default MakeAdminButton;
