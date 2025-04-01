import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../state/userState";
import { UserType } from "../types/UserType";
import { useApi } from "./useApi";

export const useUser = (isAuthenticated?: boolean): UserType | null => {
  const api = useApi();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (isAuthenticated && !user?.id) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`users/me`);
          setUser(response.data);
          // console.log(response.data);
          localStorage.setItem("user.username", response?.data?.username);
        } catch (err) {
          console.log("Error fetching user data");
        }
      };

      fetchUser();
    }
  }, [user, isAuthenticated]);

  return user;
};
