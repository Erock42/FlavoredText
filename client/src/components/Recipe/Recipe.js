import React from "react";
import "./Recipe.css";
import "../../app.css";

const Recipe = ({ title, image, ingredients, full }) => {
  return (
    <div className="recipe">
      <h3>{title}</h3>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <button className='search-button'><a href={full} target="_blank" rel="noreferrer">Full recipe</a></button>

      <img className="style.image" src={image} alt="" />

    </div>
  );
};

export default Recipe;
