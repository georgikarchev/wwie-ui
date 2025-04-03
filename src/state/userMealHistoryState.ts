import { atom } from "recoil";
import { UserMealHistory } from "../types/userMealHistory";

export const userMealHistoryState = atom<UserMealHistory[]>({
  key: "userMealHistoryState",
  default: [] as UserMealHistory[],
});
