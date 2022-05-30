import React from "react";
import "./RecipeList.css";

const RecipeList = ({ title, image, ingredients }) => {
  return (
    <div className="recipe-list">
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <img className="style.image" src={image} alt="" />

      {/* need to change/add full recipe page (maybe) */}
      <button className='search-button'><a href="https://www.edamam.com/recipes/" target="_blank" rel="noreferrer">Full recipe</a></button>
      
    </div>
  );
};

export default RecipeList;