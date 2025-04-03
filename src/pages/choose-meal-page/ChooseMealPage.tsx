import React, { useCallback, useEffect, useMemo, useState } from "react";
import Meal from "../../components/meal/Meal";
import { useApi } from "../../hooks/useApi";
import { useMeals } from "../../hooks/useMeals";
import { useUser } from "../../hooks/useUser";
import { useUserMealsHistory } from "../../hooks/useUserMealsHistory";
import { MealType } from "../../types/MealType";
import { UserMealHistory } from "../../types/UserMealHistory";
import "./ChooseMealPage.scss";

interface Props {}

const ChooseMealPage: React.FC<Props> = ({}) => {
  const api = useApi();
  const { user } = useUser();
  const { meals, loading, error } = useMeals();
  const [chooseLoading, setChooseLoading] = useState(true);
  const [chooseError, setChooseError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const {
    history,
    setHistory,
    loading: historyLoading,
    error: historyError,
  } = useUserMealsHistory();

  const historyMealIds: string[] = useMemo(
    () => history.map((h) => h.mealId),
    [history],
  );

  const suggestions = useMemo(
    () => meals.filter((m) => !historyMealIds.includes(m.id)),
    [historyMealIds],
  );

  function getCurrentISOTime(): string {
    return new Date().toISOString().slice(0, 19);
  }

  const findMealById = useCallback(
    (id: string): MealType | undefined => meals.find((m) => m.id === id),
    [meals],
  );

  const saveSelectedMealToUserHistory = async (
    userId: string,
    mealId: string,
    rating: number,
    consumedOn: string,
  ) => {
    setChooseLoading(true);
    try {
      const newMealsHistoryItem = await api.post("/meals-history", {
        userId,
        mealId,
        rating,
        consumedOn,
      });

      setHistory((oldHistory) => [
        ...oldHistory,
        newMealsHistoryItem.data as UserMealHistory,
      ]);

      setMessage(
        "Nice choice! " + findMealById(mealId)?.name + " sounds delicious!",
      );
    } catch (err) {
      setChooseError("Error choosing meal");
    } finally {
      setChooseLoading(false);
    }
  };

  const chooseMeal = (mealid: string) => {
    if (!user || user.id === undefined) return;
    saveSelectedMealToUserHistory(user?.id, mealid, 5, getCurrentISOTime());
  };

  // const getRandomElement = (arr: MealType[]): MealType =>
  //   arr[Math.floor(Math.random() * arr.length)];

  const extractRandomElement = (arr: MealType[]): MealType | undefined =>
    arr.length
      ? arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
      : undefined;

  let availableSuggestions = useMemo(
    () => (suggestions.length > 0 ? suggestions.slice() : meals.slice()),
    [suggestions, meals],
  );

  const suggestion1 = useMemo(
    () => extractRandomElement(availableSuggestions),
    [availableSuggestions],
  );
  const suggestion2 = useMemo(
    () => extractRandomElement(availableSuggestions),
    [availableSuggestions],
  );
  const suggestion3 = useMemo(
    () => extractRandomElement(availableSuggestions),
    [availableSuggestions],
  );

  useEffect(() => {
    if (message !== null) {
      setTimeout(() => setMessage(null), 2000);
    }
  }, [message]);

  // if (loading || historyLoading || chooseLoading) return <div>Loading...</div>;
  if (error || historyError) return <div>Could not fetch data.</div>;
  if (chooseError) return <div>Could not save choice.</div>;

  return (
    <div className="page page--meals">
      <h1 className="page__title">Meals</h1>
      <section className="page__block">
        {message !== null ? message : "Choose your next meal."}
      </section>
      {/* <section className="page__block"> */}
      {availableSuggestions.length > 0 ? (
        <>
          {!!suggestion1 && (
            <div
              className="suggestion"
              key={suggestion1?.id}
              onClick={() => chooseMeal(suggestion1?.id)}
            >
              <Meal
                id={suggestion1?.id}
                name={suggestion1.name}
                disableLink={true}
              />
            </div>
          )}
          {!!suggestion2 && (
            <div
              className="suggestion"
              key={suggestion2?.id}
              onClick={() => chooseMeal(suggestion2?.id)}
            >
              <Meal
                key={suggestion2?.id}
                id={suggestion2?.id}
                name={suggestion2.name}
                disableLink={true}
              />
            </div>
          )}
          {!!suggestion3 && (
            <div
              className="suggestion"
              key={suggestion3?.id}
              onClick={() => chooseMeal(suggestion3?.id)}
            >
              <Meal
                key={suggestion3?.id}
                id={suggestion3?.id}
                name={suggestion3.name}
                disableLink={true}
              />
            </div>
          )}
        </>
      ) : (
        <p>No meals available.</p>
      )}
      {/* </section> */}
    </div>
  );
};

export default ChooseMealPage;
