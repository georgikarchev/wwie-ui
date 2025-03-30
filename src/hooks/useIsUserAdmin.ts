import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

export const useIsUserAdmin = (): boolean => {
  const user = useRecoilValue(userState);

  return user?.userRole === "ADMIN";
};
