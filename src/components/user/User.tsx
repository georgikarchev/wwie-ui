import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { backState } from "../../state/backState";
import { pageState } from "../../state/pageState";
import { UserType } from "../../types/UserType";
import Tag from "../tag/Tag";
import "./User.scss";

interface Props {
  user: UserType;
  disableLink?: boolean;
  deleted: boolean;
}

const User: React.FC<Props> = ({ user, disableLink = false, deleted }) => {
  const [page, setPage] = useRecoilState(pageState);
  const setBack = useSetRecoilState(backState);
  const goUser = () => {
    if (disableLink) {
      return;
    }

    if (user?.id === undefined) {
      return;
    }

    setBack(page);
    setPage({ name: "user", queryParams: { id: user?.id } });
  };

  if (!user) {
    return null;
  }

  return (
    <article className={`user ${deleted && "deleted"}`} onClick={goUser}>
      <h4>{user.username}</h4>
      {user.userRole === "ADMIN" && <Tag>ADMIN</Tag>}
    </article>
  );
};

export default User;
