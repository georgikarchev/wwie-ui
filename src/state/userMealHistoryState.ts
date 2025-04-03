import { atom } from "recoil";
import { UserMealHistory } from "../types/UserMealHistory";

export const userMealHistoryState = atom<UserMealHistory[]>({
  key: "userMealHistoryState",
  default: [] as UserMealHistory[],
});
