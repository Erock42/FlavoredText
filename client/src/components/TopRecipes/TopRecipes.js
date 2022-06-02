import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TopRecipes.css';

const Recipe = ({ title, image, full }) => {
  return (
    <div className="recipe">
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <button className='search-button'><a href={full} target="_blank" rel="noreferrer">Full recipe</a></button>
      </div>
      <div>
        <img className="style.image" src={image} alt="" />
      </div>
    </div>
  );
};

const TopRecipes = () => {
  const ingredients = ["meat", "chicken", "pork", "beef", "seafood", "vegetarian", "wild rice"];
  const random = Math.floor(Math.random() * ingredients.length);
  // console.log(random, ingredients[random]);

  const [recipes, setRecipes] = useState([]);
  //const [search, setSearch] = useState('');
  const [query] = useState(ingredients[random]); // removed setQuery

  useEffect(() => {
    axios.get(`/recipes/${query}`).then((response) => {
      setRecipes(response.data);
    });
  }, [query]);

  if (!recipes) return null;

  return (
    <div className='Search'>
      <div className='recipes'>
        {recipes.map((recipe) => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} image={recipe.recipe.image} full={recipe.recipe.shareAs} />
        ))}
      </div>
    </div >
  );
};

export default TopRecipes;
