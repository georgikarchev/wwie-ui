import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ingredientState } from "../state/ingredientState";
import { IngredientType } from "../types/IngredientType";
import { useApi } from "./useApi";

type UseIngredientReturnType = {
  ingredient: IngredientType;
  error: unknown;
};

export const useIngredient = (
  ingredientId?: string,
): UseIngredientReturnType => {
  const api = useApi();
  const [ingredient, setIngredient] = useRecoilState(ingredientState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!!ingredientId) {
      const fetchIngredient = async () => {
        try {
          const response = await api.get(`ingredients/${ingredientId}`);
          setIngredient(response.data);
        } catch (err) {
          console.log("Error fetching ingredient data");
          setError(error);
        }
      };

      fetchIngredient();
    }
  }, [ingredientId]);

  return { ingredient, error };
};
