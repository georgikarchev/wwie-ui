import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import GoBack from "../../components/go-back/GoBack";
import Tag from "../../components/tag/Tag";
import { useApi } from "../../hooks/useApi";
import { useIsUserAdmin } from "../../hooks/useIsUserAdmin";
import { useUser } from "../../hooks/useUser";
import { pageState, PageStateType } from "../../state/pageState";
import { UserType } from "../../types/UserType";
import "./UserPage.scss";

interface Props {}

const UserPage: React.FC<Props> = ({}) => {
  const isAdmin = useIsUserAdmin();
  const { user: currentAppUser } = useUser();
  const api = useApi();
  // const appUser = useRecoilValue(userState);

  const [page, setPage] = useRecoilState(pageState);

  const [user, setUser] = useState({} as UserType);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userIsAdmin = user?.userRole == "ADMIN";
  const notMyAccount: boolean = currentAppUser?.id !== user?.id;

  const enableAdmin = (): void => {
    console.log("enableAdmin");
    makeAdmin();
  };

  const disableAdmin = (): void => {
    console.log("disableAdmin");
    makeUser();
  };

  const makeAdmin = async () => {
    try {
      const response = await api.put(`users/${page?.queryParams?.id}/role`, {
        userRole: "ADMIN",
      });
      setLoading(true);
      setUser(response.data);
    } catch (err) {
      console.log(err);
      setError("Error updating user role");
    } finally {
      setLoading(false);
      setPage({ name: "users" });
    }
  };

  const makeUser = async () => {
    try {
      // const response = await api.post("/auth/login", { email, password });
      const response = await api.put(`users/${page?.queryParams?.id}/role`, {
        userRole: "USER",
      });
      setLoading(true);
      setUser(response.data);
    } catch (err) {
      console.log(err);
      setError("Error updating user role");
    } finally {
      setLoading(false);
      setPage({ name: "users" });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`users/${page?.queryParams?.id}`);
        setLoading(true);
        setUser(response.data);
      } catch (err) {
        console.log(err);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user || user === undefined) return null;

  return (
    <div className="page page--user">
      <section className="page__actions">
        <GoBack to={{ name: "users" } as PageStateType} />
        {isAdmin && !userIsAdmin && notMyAccount && (
          <div className="toggle-admin" onClick={enableAdmin}>
            <Tag>enable admin</Tag>
          </div>
        )}
        {isAdmin && userIsAdmin && notMyAccount && (
          <div className="toggle-admin" onClick={disableAdmin}>
            <Tag>disable admin</Tag>
          </div>
        )}
        {!notMyAccount && <Tag>ADMIN</Tag>}
        {/* {isAdmin && <DeleteButton onClick={deleteItem} />} */}
      </section>
      <h1 className="page__title">{user?.username}</h1>
      <section className="page__block">
        id: {user.id || "N/A"}
        <br />
        username: {user.username || "N/A"}
        <br />
        email: {user.email || "N/A"}
        <br />
        {/* SHOW current userRole as well as button to switch it */}
      </section>
    </div>
  );
};

export default UserPage;
