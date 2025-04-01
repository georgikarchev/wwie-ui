import React, { useEffect, useState } from "react";
import Ingredients from "../../components/ingredients/Ingredients";
import { useApi } from "../../hooks/useApi";
import "./IngredientsPage.scss";

interface Props {}

const IngredientsPage: React.FC<Props> = ({}) => {
  const api = useApi();
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await api.get("ingredients");
        setIngredients(response.data);
      } catch (err) {
        setError("Error fetching ingredients");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page page--ingredients">
      <h1 className="page__title">Ingredients</h1>
      {/* <section className="page__block"> */}
      {ingredients.length > 0 ? (
        <Ingredients ingredients={ingredients} />
      ) : (
        <p>No ingredients available.</p>
      )}
      {/* </section> */}
    </div>
  );
};

export default IngredientsPage;
