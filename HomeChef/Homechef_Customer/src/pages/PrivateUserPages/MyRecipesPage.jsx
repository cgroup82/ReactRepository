import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import CategorySelect from "../../components/CategorySelect";
import SearchInput from "../../components/SearchInput";
import AddRecipeModal from "../../components/AddRecipeModal";
import EditRecipeModal from "../../components/EditRecipeModal";
import { useMyRecipesData } from "../../hooks/useMyRecipesData";
import { toast } from "react-toastify"; // Use toast from the global context

export default function MyRecipesPage() {
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  const {
    recipes,
    loading,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    searchTerm,
    setSearchTerm,
    removeRecipe,
    reloadRecipes,
  } = useMyRecipesData();

  const handleDelete = async (recipeId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await removeRecipe(recipeId);
      Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
      toast.success("Recipe deleted! 🎆💥✨"); // Fireworks effect after deletion
    } catch (err) {
      console.error("Failed to delete", err);
      Swal.fire("Error", "Something went wrong.", "error");
      toast.error("Failed to delete recipe. 💥✨"); // Fireworks effect on error
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-gray-900 dark:bg-[#202124] dark:text-[#f5f5f5]">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Recipes 👨‍🍳
      </h2>

      <AddRecipeModal onRecipeAdded={reloadRecipes} />
      <SearchInput searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

      <CategorySelect
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      {loading ? (
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center text-red-500">No recipes found.</div>
      ) : (
        <div className="m-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipeId}
              className="bg-card dark:bg-card-dark border-border dark:border-border-dark relative overflow-hidden rounded-2xl border shadow-lg transition duration-300 hover:shadow-2xl"
            >
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="h-48 w-full object-cover"
                />
              </a>
              <div className="space-y-2 p-4">
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-500 dark:text-white">
                    {recipe.title}
                  </h3>
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Category: {recipe.categoryName}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>🕒 {recipe.cookingTime} min</span>
                  <span>🍽 {recipe.servings} servings</span>
                </div>
              </div>

              <div className="absolute right-3 top-3 flex gap-2">
                <button
                  onClick={() => setEditingRecipeId(recipe.recipeId)}
                  className="rounded-full bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                  title="Edit"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(recipe.recipeId)}
                  className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
                  title="Delete"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingRecipeId && (
        <EditRecipeModal
          recipeId={editingRecipeId}
          onClose={() => setEditingRecipeId(null)}
          onRecipeUpdated={() => {
            reloadRecipes();
            setTimeout(() => setEditingRecipeId(null), 50);
          }}
        />
      )}
    </div>
  );
}
