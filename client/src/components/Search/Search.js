import React, { useEffect, useState } from 'react';
import Recipe from '../Recipe/Recipe';
import axios from 'axios';
import './Search.css';

// // test random recipe
// // display random recipe
// const topRecipes = [
//   {
//     1: { URL: 'https://www.edamam.com/results/recipe/?recipe=campfire-feijoada-4b04e5290e4196f7d3e8692684b90957', label: 'Campfire Feijoada' },
//     2: { URL: 'https://www.edamam.com/results/recipe/?recipe=pasta-alla-gricia-recipe-20022d91be0968092a8eab1aceee81be', label: 'Pasta alla Gricia' },
//     3: { URL: 'https://www.edamam.com/results/recipe/?recipe=pizza-margherita-recipe-9b9b8b8b9b8b9b8b9b8b9b8b9b8b9b8b', label: 'Pizza Margherita' },
//     4: { URL: 'https://www.edamam.com/results/recipe/?recipe=chicken-teriyaki-888e9fc4a808e9e4ccdb2ac24a6a2f46', label: 'Chicken Teriyaki' },
//     5: { URL: 'https://www.edamam.com/results/recipe/?recipe=ikura-(salmon-caviar)-5cfd32ab67396a6249f599b2f53e6b57', label: 'Ikura (Salmon Caviar)' },
//   }];

// const randomRecipe = topRecipes[Math.floor(Math.random() * topRecipes.length)];
// // console.log(randomRecipe);

const Search = () => {
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

  const updateSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className='Search'>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch} />
        <button className='search-button' type='submit'>
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map((recipe) => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} full={recipe.recipe.shareAs} />
        ))}
      </div>

      {/* very basic "random recipes" */}
      {/* <div className='recipes' >
        <button className='search-button' href={randomRecipe[1].URL} target="_blank" rel="noopener noreferrer">{randomRecipe[1].label}</button>
        <button className='search-button' href={randomRecipe[2].URL} target="_blank" rel="noopener noreferrer">{randomRecipe[2].label}</button>
        <button className='search-button' href={randomRecipe[3].URL} target="_blank" rel="noopener noreferrer">{randomRecipe[3].label}</button>
        <button className='search-button' href={randomRecipe[4].URL} target="_blank" rel="noopener noreferrer">{randomRecipe[4].label}</button>
        <button className='search-button' href={randomRecipe[5].URL} target="_blank" rel="noopener noreferrer">{randomRecipe[5].label}</button>
      </div> */}
    </div >
  );
};

export default Search;
