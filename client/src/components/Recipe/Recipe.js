import React from "react";
import "./Recipe.css";

const Recipe = ({ title, image, ingredients, recipe }) => {
  return (
    <div className="recipe">
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <img className="style.image" src={image} alt="" />

      {/* need to change/add full recipe page (maybe) */}
      <button className='search-button' onClick={() => window.open(recipe["recipe"]["url"])}>
        Full recipe
      </button>
      
    </div>
  );
};

export default Recipe;
