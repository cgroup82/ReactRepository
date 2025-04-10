// ✅ components/RecipeInfoSection.jsx

import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecipeInfoSection = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:from-gray-300 hover:to-gray-400 dark:from-gray-700 dark:to-gray-800 dark:text-white dark:hover:from-gray-600"
      >
        <FaArrowLeft className="text-md" />
        Back to Recipes
      </button>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl shadow-md">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {recipe.title}
          </h1>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            {recipe.publisher && (
              <p>
                <strong>Published by:</strong> {recipe.publisher}
              </p>
            )}
            <p>
              <strong>Date:</strong>{" "}
              {new Date(recipe.createdAt).toLocaleDateString()}
            </p>
            {recipe.cuisine && (
              <p>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>
            )}
            {recipe.cookingTime > 0 && (
              <p>
                <strong>Cooking Time:</strong> {recipe.cookingTime} min
              </p>
            )}
            {recipe.servings > 0 && (
              <p>
                <strong>Servings:</strong> {recipe.servings}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {recipe.vegetarian && (
              <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
                Vegetarian
              </span>
            )}
            {recipe.vegan && (
              <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                Vegan
              </span>
            )}
            {recipe.glutenFree && (
              <span className="rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Gluten Free
              </span>
            )}
          </div>

          {recipe.sourceUrl && (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              View Original ↗
            </a>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {recipe.summary && (
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold">Summary</h2>
            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          </div>
        )}

        {recipe.instructionsText && (
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold">Instructions</h2>
            {recipe.instructionsText.includes("<li>") ? (
              <div
                className="space-y-1"
                dangerouslySetInnerHTML={{
                  __html: recipe.instructionsText,
                }}
              />
            ) : (
              <pre className="whitespace-pre-wrap rounded-xl bg-gray-100 p-5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                {recipe.instructionsText}
              </pre>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeInfoSection;
