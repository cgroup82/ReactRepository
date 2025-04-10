import React, { useState, useEffect } from "react";
import api from "../api/api";


const CategorySelect = () => {

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mx-auto my-8 max-w-6xl rounded-xl bg-gray-100 px-6 py-4 shadow-sm dark:bg-gray-800">
      <label
        htmlFor="category"
        className="block text-lg font-semibold text-gray-700 dark:text-white mb-2"
      >
        Filter by Category:
      </label>
      <select
        id="category"
        value={selectedCategoryId ?? ""}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
         className="w-full sm:w-60 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

    </div>
  );
};

export default CategorySelect;