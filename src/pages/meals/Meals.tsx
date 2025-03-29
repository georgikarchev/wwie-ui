import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

const Meals: React.FC = () => {
  const api = useApi(); // Get the axios instance from your hook
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await api.get("meals"); // API call
        setMeals(response.data);
        console.log(response.data);
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
    <div>
      <h1>Meals</h1>
      {meals.length > 0 ? (
        <ul>
          {meals.map((meal) => (
            <li key={meal.id}>{meal.name}</li>
          ))}
        </ul>
      ) : (
        <p>No meals available.</p>
      )}
    </div>
  );
};

export default Meals;
