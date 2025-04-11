import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeInfoSection from "../components/RecipeInfoSection";
import RecipeRatingBlock from "../components/RecipeRatingBlock";
import RecipeReviews from "../components/RecipeReviews";
import { fetchRecipeProfile, fetchUserRating, postRating } from "../api/api";

const RecipeProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recipeRes, ratingRes] = await Promise.all([
          fetchRecipeProfile(id),
          token
            ? fetchUserRating(id)
            : Promise.resolve({ data: { rating: 0 } }),
        ]);

        setRecipe(recipeRes.data);
        setAverageRating(Number(recipeRes.data.averageRating || 0));
        setTotalRatings(Number(recipeRes.data.totalRatings || 0));
        setUserRating(Number(ratingRes.data?.rating ?? 0));
      } catch (err) {
        console.error(err);
        setError("Recipe not found");
      }
    };

    loadData();
  }, [id, token]);

  const handleRatingChange = async (newRating) => {
    if (!token) {
      toast.info("Please login to rate this recipe ⭐");
      return;
    }

    try {
      await postRating(id, newRating);
      toast.success("Rating submitted! 🌟");
      setUserRating(newRating);

      const updatedTotal = totalRatings + (userRating ? 0 : 1);
      const updatedAverage = (
        (averageRating * totalRatings + newRating) /
        updatedTotal
      ).toFixed(1);

      setAverageRating(Number(updatedAverage));
      setTotalRatings(updatedTotal);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit rating.");
    }
  };

  if (error) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center text-xl text-red-600 dark:text-red-400">
        <h2 className="mb-2 text-4xl font-extrabold">404</h2>
        <p className="mb-4 text-lg">{error}</p>
        <button
          className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 text-white"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="mt-20 text-center text-xl text-gray-500 dark:text-gray-300">
        Loading recipe...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 max-w-6xl rounded-2xl bg-white px-6 py-8 shadow-xl dark:bg-gray-900">
      <ToastContainer />

      <RecipeInfoSection recipe={recipe} />

      <RecipeRatingBlock
        userRating={userRating}
        averageRating={averageRating}
        totalRatings={totalRatings}
        editable={!!token}
        onChange={handleRatingChange}
      />

      <RecipeReviews recipeId={id} token={token} />
    </div>
  );
};

export default RecipeProfilePage;
