import React, { useEffect, useState } from "react";
import Meal from "../../components/meal/Meal";
import { useApi } from "../../hooks/useApi";
import "./MealsPage.scss";

const Meals: React.FC = () => {
  const api = useApi();
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page page--meals">
      <h1 className="page__title">Meals</h1>
      {/* <section className="page__block"> */}
      {meals.length > 0 ? (
        <>
          {meals.map((meal) =>
            !meal ? null : (
              <Meal key={meal?.id} id={meal?.id} name={meal.name} />
            ),
          )}
        </>
      ) : (
        <p>No meals available.</p>
      )}
      {/* </section> */}
    </div>
  );
};

export default Meals;
