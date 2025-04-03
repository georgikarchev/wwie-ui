import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import DeleteButton from "../../components/delete-button/DeleteButton";
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

  const deleteUser = async (ingredientId: string) => {
    try {
      await api.delete("/users/" + ingredientId);
    } catch (err) {
      setError("Error deleting ingredient");
    } finally {
    }
  };

  const deleteItem = async () => {
    if (!!user?.id && user?.id !== undefined) {
      console.log("[LOG] delete user");
      await deleteUser(user?.id);
      setPage({ name: "users" });
    }
  };

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
        {isAdmin && !userIsAdmin && notMyAccount && (
          <DeleteButton onClick={deleteItem} />
        )}
      </section>
      <h1 className="page__title">{user?.username}</h1>
      <section className="page__block">
        <b>id:</b> {user.id || "N/A"}
        <br />
        <br />
        <b>username:</b> {user.username || "N/A"}
        <br />
        <br />
        <b>email:</b> {user.email || "N/A"}
        <br />
        <br />
        <b>role:</b> {user.userRole || "N/A"}
        <br />
        <br />
        <b>created:</b> {user.createdOn || "N/A"}
        <br />
        <br />
        <b>updated:</b> {user.updatedOn || "N/A"}
        <br />
        <br />
        <b>picture:</b> {user.profilePictureLink || "N/A"}
        <br />
        <br />
      </section>
    </div>
  );
};

export default UserPage;
