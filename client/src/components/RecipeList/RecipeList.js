import React, { useEffect, useState } from 'react';
import Recipe from '../Recipe/Recipe';
import axios from 'axios';
import "./RecipeList.css";

const RandomRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  // need to change localhost:3000 to URL
  useEffect(() => {
    axios.get(`/recipes/${query}`).then((response) => {
      setRecipes(response.data);
    });
  }, [query]);

  if (!recipes) return null;

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <aside>
      <h3>Suggested Recipes:</h3>
      <div onLoad={getSearch} className='recipe-list'></div>
      <div className='recipes-listed'>
        {recipes.map((recipe) => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} url={recipe.recipe.label}/>
        ))}
      </div>
    </aside>
  )

};

const RecipeList = () => {
  return (
    <div className="recipe-list">
      <RandomRecipe/>
      <RandomRecipe/>
      <RandomRecipe/>
      <RandomRecipe/>
      <RandomRecipe/>
      <RandomRecipe/>
    </div>
  );
};

export default RecipeList;