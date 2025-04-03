import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

export const useIsUserAdmin = (): boolean => {
  const user = useRecoilValue(userState);

  if (!user || !user?.userRole) {
    return false;
  }

  console.log("ROLE: ", user.userRole, user);

  return user.userRole === "ADMIN";
};
