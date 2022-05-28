import React, { useEffect, useState } from 'react';
import Recipe from '../components/Recipe/Recipe';
import axios from 'axios';
import '../components/Search/Search.css';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await axios.get(`http://localhost:3000/recipes/${query}`);
    // console.log(response.data);
    setRecipes(response.data);
  };

  const updateSearch = (e) => {
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
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
};

export default Search;
