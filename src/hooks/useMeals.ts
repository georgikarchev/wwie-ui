import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mealsState } from "../state/mealsState";
import { MealType } from "../types/MealType";
import { useApi } from "./useApi";

type UseMealReturnType = {
  meals: MealType[];
  error: unknown;
  loading: boolean;
};

export const useMeals = (): UseMealReturnType => {
  const api = useApi();
  const [meals, setMeals] = useRecoilState(mealsState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await api.get("meals");
        setMeals(response.data);
      } catch (err) {
        setError("Error fetching meals");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return { meals, error, loading };
};
