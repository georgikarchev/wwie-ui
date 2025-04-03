import { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { userMealHistoryState } from "../state/userMealHistoryState";
import { UserMealHistory } from "../types/userMealHistory";
import { useApi } from "./useApi";
import { useUser } from "./useUser";

type UseUserMealsHistoryReturnType = {
  history: UserMealHistory[];
  setHistory: SetterOrUpdater<UserMealHistory[]>;
  loading: boolean;
  error: string | null;
};

export const useUserMealsHistory = (): UseUserMealsHistoryReturnType => {
  const { user } = useUser();
  const api = useApi();
  const [history, setHistory] =
    useRecoilState<UserMealHistory[]>(userMealHistoryState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("UEffect", user?.id);
    if (user?.id) {
      const fetchUserMealHistory = async () => {
        console.log("fetching history...");
        setLoading(true);
        try {
          const response = await api.get(
            `/meals-history/recent?userId=${user?.id}&startDate=2025-03-10T21:43:43.420Z`,
          );
          setHistory(response.data);
        } catch (err) {
          console.log("Error fetching user's meal history data");
          setError(err as string);
        } finally {
          setLoading(false);
        }
      };

      fetchUserMealHistory();
    }
  }, [user?.id]);

  return { history, setHistory, loading, error };
};
