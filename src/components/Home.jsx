import { useEffect, useState } from "react";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "https://server-ivym.onrender.com/auth/public"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Recipe Rumours</h1>
        <p className="text-lg text-gray-600">
          Discover and add your favorite recipes
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-xl font-bold mb-2 text-orange-600">
                {recipe.title}
              </h2>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold text-orange-600">
                Ingredients:
              </h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-orange-600">
                  Instructions:
                </h3>
                <ol className="list-decimal list-inside">
                  {recipe.instructions.split("\n").map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center col-span-3 text-xl">Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
