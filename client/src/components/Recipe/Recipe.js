import React from "react";
import "./Recipe.css";
import "../../app.css";

const Recipe = ({ title, image, ingredients }) => {
  return (
    <div className="recipe">
      <h1>{title}</h1>
      <ol>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ol>
      <img className="style.image" src={image} alt="" />
    </div>
  );
};

export default Recipe;
