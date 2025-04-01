import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mealState } from "../state/mealState";
import { MealType } from "../types/MealType";
import { useApi } from "./useApi";

type UseMealReturnType = {
  meal: MealType;
  error: unknown;
};

export const useMeal = (mealId?: string): UseMealReturnType => {
  const api = useApi();
  const [meal, setMeal] = useRecoilState(mealState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!!mealId) {
      const fetchMeal = async () => {
        try {
          const response = await api.get(`meals/${mealId}`);
          setMeal(response.data);
        } catch (err) {
          console.log("Error fetching meal data");
          setError(error);
        }
      };

      fetchMeal();
    }
  }, [mealId]);

  return { meal, error };
};
