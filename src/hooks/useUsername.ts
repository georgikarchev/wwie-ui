// import { useAuth } from "../services/authService";

export const useUsername = () => {
  const userFromLocalStorage = localStorage.getItem("user.username");
  // const { getMyProfile } = useAuth();

  // if (!userFromLocalStorage?.id) {
  //   const user = getMyProfile();
  //   console.log(user);
  // }

  console.log(userFromLocalStorage);

  return userFromLocalStorage;
};
