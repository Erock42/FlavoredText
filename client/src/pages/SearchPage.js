import React, { useEffect, useState } from 'react';
import Recipe from '../components/Recipe/Recipe';
import axios from 'axios';
import '../components/Search/Search.css';

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  // need to change localhost:3000 to URL
  useEffect(() => {
    axios.get(`http://localhost:3000/recipes/${query}`).then((response) => {
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
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
};

export default Search;
