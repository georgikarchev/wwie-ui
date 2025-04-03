import React, { useEffect, useState } from "react";
import User from "../../components/user/User";
import { useApi } from "../../hooks/useApi";

interface Props {}

const UsersPage: React.FC<Props> = ({}) => {
  const api = useApi();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("users");
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="page page--ingredients">
      <h1 className="page__title">Ingredients</h1>
      {/* <section className="page__block"> */}
      <div className="users">
        {users.length > 0 ? (
          users.map((user) => <User key={user?.id} user={user} />)
        ) : (
          <p>No users available.</p>
        )}
      </div>
      {/* </section> */}
    </div>
  );
};

export default UsersPage;
