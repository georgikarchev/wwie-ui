import { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { userState } from "../state/userState";
import { UserType } from "../types/UserType";
import { useApi } from "./useApi";

type UseUserReturnType = {
  user: UserType | null;
  setUser: SetterOrUpdater<UserType | null>;
  loading: boolean;
  error: string | null;
};

export const useUser = (isAuthenticated?: boolean): UseUserReturnType => {
  const api = useApi();
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && !user?.id) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const response = await api.get(`users/me`);
          setUser(response.data);
          // console.log(response.data);
          localStorage.setItem("user.username", response?.data?.username);
        } catch (err) {
          console.log("Error fetching user data");
          setError(err as string);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [user, isAuthenticated]);

  return { user, setUser, loading, error };
};
